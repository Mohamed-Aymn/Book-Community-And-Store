import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/dbConnect";
import Review from "../../../models/Review";
import User from "../../../models/User";
import Book from "../../../models/Book";

interface Data {
    error?: string;
    data?: object;
    message?: string;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const { method } = req;

    await dbConnect();

    switch (method) {
        // get all reviews
        case "GET":
            try {
                let reviews = await Review.find({})
                    .populate({ path: "reviewer", select: "name", model: User })
                    .exec();
                let totalItems = reviews.length;
                res.status(200).json({
                    data: {
                        totalItems,
                        reviews,
                    },
                });
            } catch (error) {
                let result = (error as Error).message;
                let name = (error as Error).name;
                res.status(500).json({
                    error: `${name}${name ? "/ " : null}${result}`,
                });
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
            } catch (error) {
                // let message = (error as Error).message;
                // let name = (error as Error).name;
                let { name, message } = error as Error;
                res.status(500).json({
                    error: `${name}${name ? "/ " : null}${message}`,
                });
            }
            break;

        default:
            res.status(500).json({
                error: "some kind of error has occurred",
            });
            break;
    }
}
