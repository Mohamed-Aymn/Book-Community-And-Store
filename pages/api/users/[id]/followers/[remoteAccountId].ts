import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../../../lib/dbConnect";
import User from "../../../../../models/User";

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

    let accountId = query.id;
    let remoteAccountId = query.remoteAccountId;

    await dbConnect();

    switch (method) {
        case "DELETE" /* Delete a model by its ID */:
            try {
                // add remote account to following list
                await User.findByIdAndUpdate(
                    { _id: accountId },
                    {
                        $pull: {
                            following: { $each: [remoteAccountId] },
                        },
                    }
                );

                // add account id to remote account followers
                await User.findByIdAndUpdate(
                    { _id: remoteAccountId },
                    {
                        $pull: {
                            followers: { $each: [accountId] },
                        },
                    }
                );

                res.status(200).json({
                    message: "delete a user",
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
