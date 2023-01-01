import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/dbConnect";
import Book from "../../../models/Book";
import Review from "../../../models/Review";
import User from "../../../models/User";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
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
                        modle: Review,
                        select: "-bookid",
                        populate: {
                            path: "reviewer",
                            model: User,
                            select: "name email",
                        },
                    })
                    .populate({
                        path: "readers",
                        modle: User,
                        select: "name email",
                    })
                    .exec();

                let totalReviews = book.reviews.length;
                let totalReaders = book.readers.length;
                if (book) {
                    data.reviews = {
                        totalReviews,
                        data: book.reviews,
                    };
                    data.readers = {
                        totalReaders,
                        data: book.readers,
                    };
                }
                res.status(200).json({ data });
            } catch {
                (err: any) => res.status(500).json({ error: err.message });
            }
            break;

        default:
            res.status(400).json({ success: false });
            break;
    }
}
