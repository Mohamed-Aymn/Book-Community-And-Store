import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/dbConnect";
import Book from "../../../models/Book";

type Data = {
    name: string;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    // type here the logic for each customized collection
    const {
        query: { search, collection, genre, intitle, inauthor, lang, page },
        method,
    } = req;

    await dbConnect();

    if (method == "POST") {
        try {
            const book = await Book.create(
                req.body
            ); /* create a new model in the database */
            res.status(201).json({ success: true, data: book });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    } else if (method == "GET") {
        let url;
        if (search) {
            url = `https://www.googleapis.com/books/v1/volumes?q=${search}&maxResults=28`;
        } else if (collection) {
            url = `https://www.googleapis.com/books/v1/volumes?q=filter:${collection}&maxResults=15`;
        } else if (genre) {
            url = `https://www.googleapis.com/books/v1/volumes?q=subject:${genre}&maxResults=28`;
        } else if (intitle) {
            url = `https://www.googleapis.com/books/v1/volumes?q=intitle:${intitle}&maxResults=28`;
        } else if (inauthor) {
            url = `https://www.googleapis.com/books/v1/volumes?q=inauthor:${inauthor}&maxResults=28`;
        }

        // filters
        if (lang) {
            url = `${url}&langRestrict=${lang}`;
        }

        // pagination
        if (page) {
            let pageIndex = Number(page) - 1;
            url = `${url}&startIndex=${pageIndex * 28}`;
        }

        // function
        try {
            const dataStream = await fetch(url);
            const data = await dataStream.json();
            res.status(200).json({ data });
        } catch (err: any) {
            console.log(err.message);
            return { Error: err.stack };
        }
    }

    // main search queries
}
