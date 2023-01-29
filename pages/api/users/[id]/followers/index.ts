import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../../../lib/dbConnect";
import Review from "../../../../../models/Review";
import User from "../../../../../models/User";

interface Data {
    error?: string;
    data?: object;
    message?: string;
}

// post get delete

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const { query, method } = req;

    let accountId;
    if (query.id) accountId = query.id;

    let remoteAccountId;
    if (req.body) remoteAccountId = req.body.id;

    console.log(query);
    console.log(req.body);

    await dbConnect();

    switch (method) {
        // get a single user by id
        case "GET":
            try {
                res.status(200).json({
                    message: "get all followers",
                });
            } catch (error) {
                let message = (error as Error).message;
                let name = (error as Error).name;
                res.status(500).json({
                    error: `${name}${name ? "/ " : null}${message}`,
                });
            }
            break;
        case "POST":
            try {
                // add remote account to following list
                await User.findByIdAndUpdate(
                    { _id: accountId },
                    {
                        $push: {
                            following: { $each: [remoteAccountId] },
                        },
                    }
                );

                // add account id to remote account followers
                await User.findByIdAndUpdate(
                    { _id: remoteAccountId },
                    {
                        $push: {
                            followers: { $each: [accountId] },
                        },
                    }
                );

                res.status(200).json({
                    message: "create a user",
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
