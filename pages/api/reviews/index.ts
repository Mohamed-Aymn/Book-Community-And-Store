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
        // get all reviews
        case "GET":
            try {
                Review.find({})
                    .populate({ path: "reviewer", select: "name", model: User })
                    .exec(function (err, reviews) {
                        if (err) throw new Error(err.message);
                        let totalItems = reviews.length;
                        res.status(200).json({
                            data: {
                                totalItems,
                                reviews,
                            },
                        });
                    });
            } catch (error: any) {
                res.status(500).json({ error: error.message });
            }
            break;

        // create a new review
        case "POST":
            try {
                const review = await Review.create(req.body);

                await User.findByIdAndUpdate(
                    { _id: req.body.reviewer },
                    {
                        $push: {
                            reviews: { $each: [review._id] },
                        },
                    }
                );

                // add reveiw id as ref to the book document
                (async () => {
                    // search if this book already exists on mongodb
                    let book = await Book.findOneAndUpdate(
                        { _id: req.body.book },
                        {
                            $push: {
                                reviews: { $each: [review._id] },
                            },
                        }
                    );
                    // if it doesn't exist just create one for it
                    if (!book) {
                        book = await Book.create({
                            _id: req.body.book,
                            reviews: [review._id],
                        });
                    }
                })();

                res.status(200).json({
                    message: "review is successfully added to database",
                    data: review,
                });
            } catch (error: any) {
                res.status(500).json({ error: error.message });
            }
            break;

        default:
            res.status(500).json({
                error: "some kind of error has occurred",
            });
    }
}
