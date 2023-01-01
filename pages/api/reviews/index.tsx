import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/dbConnect";
import Review from "../../../models/Review";
import User from "../../../models/User";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { method } = req;

    await dbConnect();

    try {
        const reviews = await Review.find({})
            // i don't need to populate book data as i don't have it's data in mongodb
            .populate({
                path: "reviewer",
                modle: User,
                select: "name",
            })
            .exec();

        let totalReviews = reviews.length;

        res.status(200).json({
            data: {
                totalReviews,
                reviews,
            },
        });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }

    // Review.find()
    //     .populate("reviewer")
    //     .exec()
    //     .then((docs) => {
    //         res.status(200).json({ success: docs });
    //     })
    //     .catch((err) => {
    //         res.status(500).json({ error: err });
    //     });
}
