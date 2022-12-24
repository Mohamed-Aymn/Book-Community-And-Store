// this will handle all users logic http://localhost:3000/api/users

import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/dbConnect";
import User from "../../../models/User";

// type Data = {
//     name: string;
// };

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { method } = req;

    await dbConnect();

    switch (method) {
        case "GET":
            try {
                const users = await User.find(
                    {}
                ); /* find all the data in our database */
                res.status(200).json({ success: true, data: users });
            } catch (error) {
                res.status(400).json({ error: error.message });
            }
            break;
        case "POST":
            try {
                const users = await User.create(
                    req.body
                ); /* create a new model in the database */
                res.status(201).json({ success: true, data: users });
            } catch (error) {
                res.status(400).json({ error: error.message });
            }
            break;
        default:
            res.status(400).json({ success: false });
            break;
    }
}
