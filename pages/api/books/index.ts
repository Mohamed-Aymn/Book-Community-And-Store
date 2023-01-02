import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/dbConnect";
import Book from "../../../models/Book";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const {
        query: { search, collection, genre, intitle, inauthor, lang, page },
        method,
    } = req;

    await dbConnect();

    switch (method) {
        // search for books by different methods
        case "GET":
            let url = "";
            // search by both book title and author name
            if (search) {
                url = `https://www.googleapis.com/books/v1/volumes?q=${search}&maxResults=28`;
            }
            // search by print type
            else if (collection) {
                url = `https://www.googleapis.com/books/v1/volumes?q=filter:${collection}&maxResults=15`;
            }
            // search by genre
            else if (genre) {
                url = `https://www.googleapis.com/books/v1/volumes?q=subject:${genre}&maxResults=28`;
            }
            // search by book title
            else if (intitle) {
                url = `https://www.googleapis.com/books/v1/volumes?q=intitle:${intitle}&maxResults=28`;
            }
            // search by author name
            else if (inauthor) {
                url = `https://www.googleapis.com/books/v1/volumes?q=inauthor:${inauthor}&maxResults=28`;
            }

            // search settings
            // filters
            if (lang) {
                url = `${url}&langRestrict=${lang}`;
            }
            // pagination
            if (page) {
                let pageIndex = Number(page) - 1;
                url = `${url}&startIndex=${pageIndex * 28}`;
            }

            try {
                const dataStream = await fetch(url);
                const data = await dataStream.json();
                res.status(200).json({ data });
            } catch (err: any) {
                res.status(400).json({ error: err.message });
            }
            break;
        // create a new model in the database
        case "POST":
            try {
                const book = await Book.create(req.body);
                res.status(201).json({
                    message: "book created successfully",
                    data: book,
                });
            } catch (err: any) {
                res.status(400).json({ error: err.message });
            }
            break;

        default:
            res.status(400).json({ success: false });
            break;
    }
}
