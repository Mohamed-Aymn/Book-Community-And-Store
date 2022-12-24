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
        query: { search, collection },
    } = req;

    // await dbConnect();

    let url;
    if (search) {
        url = `https://www.googleapis.com/books/v1/volumes?q=${search}`;
    } else {
        url = `https://www.googleapis.com/books/v1/volumes?q=book&filter=${collection}`;
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
