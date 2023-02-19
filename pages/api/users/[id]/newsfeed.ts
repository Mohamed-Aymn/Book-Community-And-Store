import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../../lib/dbConnect";
import Book from "../../../../models/Book";
import User from "../../../../models/User";
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
    let id = query.id;
    await dbConnect();

    switch (method) {
        case "GET":
            try {
                const user = await User.findById(id);

                if (user.following.length === 0) {
                    res.status(200).json({
                        message:
                            "there is nothing to show, please follow some people",
                    });
                    return;
                }

                let newsfeed: any[] = [];

                const reviews = await Review.find({});
                reviews.map((review) => {
                    // search for reviews about the same book
                    user.readBooks.map((book: string) => {
                        if (book === review.book) newsfeed.push(review);
                    });

                    // search for reviews created be followees
                    user.following.map((followee: string) => {
                        if (followee === review.reviwer) newsfeed.push(review);
                    });
                });

                if (newsfeed.length === 0) {
                    res.status(200).json({
                        message:
                            "unfortunately there is no relevant news feed for you, try to show your intresets in your fields.",
                    });
                    return;
                }

                res.status(200).json({
                    data: newsfeed,
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
