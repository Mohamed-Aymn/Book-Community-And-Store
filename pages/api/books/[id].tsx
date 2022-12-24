// this will handle api for a specific user http://localhost:3000/api/users/63a4c070924343ecf3d146f3

import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/dbConnect";
import Book from "../../../models/Book";

// type Data = {
//     name: string;
// };

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
                const dataStream = await fetch(url);
                const data = await dataStream.json();
                try {
                    // get reviews from db
                    let book = await Book.findOne({ _id: id });
                    if (book) {
                        data.reviews = book.reviews;
                    }
                } catch {
                    (err: any) => console.log(err);
                }
                res.status(200).json({ data });
            } catch (err: any) {
                console.log(err.message);
                return { Error: err.stack };
            }
            break;
        case "PUT": // update
            try {
                const dataStream = await fetch(url);
                const data = await dataStream.json();
                try {
                    // get reviews from db
                    let book = await Book.findByIdAndUpdate(id, req.body, {
                        new: true,
                        runValidators: true,
                    });
                    if (book) {
                        data.reviews = book.reviews;
                    } else if (!book) {
                        // create a reviews data for this books
                        book = await Book.create();
                        data.reviews = book.reviews;
                    }
                } catch {
                    (err: any) => console.log(err);
                }
                res.status(200).json({ data });
            } catch (err: any) {
                console.log(err.message);
                return { Error: err.stack };
            }
            break;

        case "DELETE" /* Delete comment or review */:
            try {
                const deleteBook = await Book.deleteOne({ _id: id });
                if (!deleteBook) {
                    return res.status(400).json({ success: false });
                }
                res.status(200).json({ success: true, data: {} });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;

        default:
            res.status(400).json({ success: false });
            break;
    }
}
