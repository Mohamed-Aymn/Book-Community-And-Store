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
                const existanceCheck = await User.findById(accountId).select(
                    "following"
                );
                if (!existanceCheck.following.includes(remoteAccountId)) {
                    throw new Error(
                        "user already doesn't exist in the followig list"
                    );
                }

                // add remote account to following list
                await User.findByIdAndUpdate(
                    { _id: accountId },
                    {
                        $pullAll: {
                            following: [remoteAccountId],
                        },
                    }
                );

                const followingCheck = await User.findById(accountId).select(
                    "following"
                );
                if (followingCheck.following.includes(remoteAccountId)) {
                    throw new Error(
                        "user is not removed form the following list"
                    );
                }

                // add account id to remote account followers
                await User.findByIdAndUpdate(
                    { _id: remoteAccountId },
                    {
                        $pullAll: {
                            followers: [accountId],
                        },
                    }
                );

                const followersCheck = await User.findById(
                    remoteAccountId
                ).select("followers");
                if (followersCheck.followers.includes(accountId)) {
                    throw new Error(
                        "user is not removed form the follower list of the remote account"
                    );
                }

                res.status(200).json({
                    message: "user removed from the follwers list",
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
