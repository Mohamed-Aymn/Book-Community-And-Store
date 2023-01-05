import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/dbConnect";
import User from "../../../models/User";

interface Data {
    error?: string;
    data?: object;
    message?: string;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const { method } = req;

    await dbConnect();

    switch (method) {
        // find all users
        case "GET":
            try {
                const users = await User.find({});
                res.status(200).json({ data: users });
            } catch (error) {
                let result = (error as Error).message;
                let name = (error as Error).name;
                res.status(500).json({
                    error: `${name}${name ? "/ " : null}${result}`,
                });
            }
            break;
        // create a new model
        case "POST":
            try {
                const user = await User.create(req.body);

                res.status(200).json({
                    message: "users is successfully created",
                    data: user,
                });
            } catch (error) {
                let result = (error as Error).message;
                let name = (error as Error).name;
                res.status(500).json({
                    error: `${name}${name ? "/ " : null}${result}`,
                });
            }
            break;
        default:
            res.status(500).json({
                error: "some kind of error has occurred",
            });
            break;
    }
}
