// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
    name: string;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    // get all possible queries
    let {
        query: { book, random },
    } = req;

    // console.log(book);

    // url conditions
    let url: any;
    if (book) {
        url = `https://www.googleapis.com/books/v1/volumes?q=${book}`;
    } else if (random) {
        url = `https://www.googleapis.com/books/v1/volumes?q=book&filter=${random}`;
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
