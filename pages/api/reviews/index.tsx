import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/dbConnect";
import Review from "../../../models/Review";
import User from "../../../models/User";
import Book from "../../../models/Book";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { method } = req;

    await dbConnect();

    switch (method) {
        case "GET":
            try {
                const reviews = await Review.find({})
                    // i don't need to populate book data as i don't have it's data in mongodb
                    .populate({
                        path: "reviewer",
                        modle: User,
                        select: "name",
                    })
                    .exec();

                let totalReviews = reviews.length;

                res.status(200).json({
                    data: {
                        totalReviews,
                        reviews,
                    },
                });
            } catch (error: any) {
                res.status(500).json({ error: error.message });
            }
            break;
        /* create a new model in the database */
        case "POST":
            try {
                const review = await Review.create(req.body)
                    .then(
                        // add review id to the user document
                        async (doc) => {
                            const user = await User.findByIdAndUpdate(
                                { _id: req.body.reviewer },
                                {
                                    $push: {
                                        reviews: { $each: [doc._id] },
                                    },
                                }
                            );
                            return doc._id;
                        }
                    )
                    // add reveiw id as ref to the book document
                    .then(async (_id) => {
                        let book = await Book.findOneAndUpdate(
                            { _id: req.body.book },
                            {
                                $push: {
                                    reviews: { $each: [_id] },
                                },
                            }
                        );
                        if (!book) {
                            book = await Book.create({
                                _id: req.body.book,
                                reviews: [_id],
                            });
                        }
                    });
                res.status(201).json({ success: true, data: review });
            } catch (error: any) {
                res.status(500).json({ error: error.message });
            }
            break;
        default:
            res.status(500).json({ error: "error" });
    }

    // Review.find()
    //     .populate("reviewer")
    //     .exec()
    //     .then((docs) => {
    //         res.status(200).json({ success: docs });
    //     })
    //     .catch((err) => {
    //         res.status(500).json({ error: err });
    //     });
}
