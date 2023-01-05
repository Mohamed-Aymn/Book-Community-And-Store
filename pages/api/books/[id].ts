import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/dbConnect";
import Book from "../../../models/Book";
import Review from "../../../models/Review";
import User from "../../../models/User";

interface Data {
    error?: string;
    data?: object;
    message?: string;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const {
        query: { id },
        method,
    } = req;

    await dbConnect();

    let url = `https://www.googleapis.com/books/v1/volumes/${id}`;

    switch (method) {
        case "GET":
            try {
                // get main data form google books api
                const dataStream = await fetch(url);
                const data = await dataStream.json();

                // get private bookstore data from mongodb
                let book = await Book.findOne({ _id: id })
                    .populate({
                        path: "reviews",
                        model: Review,
                        select: "-bookid",
                        populate: {
                            path: "reviewer",
                            model: User,
                            select: "name email",
                        },
                    })
                    .populate({
                        path: "readers",
                        model: User,
                        select: "name email",
                    })
                    .exec();
                if (book) {
                    let totalReviews = book?.reviews.length;
                    let totalReaders = book?.readers.length;
                    data.reviews = {
                        totalItems: totalReviews,
                        data: book.reviews,
                    };
                    data.readers = {
                        totalItems: totalReaders,
                        data: book.readers,
                    };
                }
                res.status(200).json({ data });
            } catch (error) {
                let message = (error as Error).message;
                let name = (error as Error).name;
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
