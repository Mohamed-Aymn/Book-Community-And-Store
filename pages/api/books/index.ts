import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
    name: string;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    // type here the logic for each customized collection
    const {
        query: { search, collection, genre, intitle, inauthor, lang },
    } = req;

    // await dbConnect();

    // main search queries
    let url;
    if (search && !genre) {
        url = `https://www.googleapis.com/books/v1/volumes?q=${search}&maxResults=28`;
    } else if (collection) {
        url = `https://www.googleapis.com/books/v1/volumes?q=filter:${collection}&maxResults=15`;
    } else if (genre) {
        url = `https://www.googleapis.com/books/v1/volumes?q=subject:${genre}&maxResults=28`;
    } else if (intitle) {
        url = `https://www.googleapis.com/books/v1/volumes?q=intitle:${intitle}&maxResults=28`;
    } else if (inauthor) {
        url = `https://www.googleapis.com/books/v1/volumes?q=inauthor:${inauthor}`;
    }

    // filters
    if (lang) {
        url = `${url}&langRestrict=${lang}`;
        console.log(url);
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
