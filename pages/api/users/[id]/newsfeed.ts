import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../../lib/dbConnect";
import Review from "../../../../models/Review";

interface Data {
    error?: string;
    data?: object;
    message?: string;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const { query, method } = req;
    await dbConnect();

    switch (method) {
        case "GET":
            try {
                const reviews = await Review.find({});

                res.status(200).json({
                    data: reviews,
                });
            } catch (error) {
                let message = (error as Error).message;
                let name = (error as Error).name;
                res.status(500).json({
                    error: `${name}${name ? "/ " : null}${message}`,
                });
            }
            break;
        default:
            res.status(400).json({
                error: "some kind of error has occurred",
            });
            break;
    }
}
