import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../../lib/dbConnect";
import Review from "../../../../models/Review";
import User from "../../../../models/User";

interface IUser {
    name: string;
    password: string;
    email: string;
    title: string;
    about: string;
    readbooks: string[];
    reviews: string[];
}

interface Data {
    error?: string;
    data?: object;
    message?: string;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const {
        query: { id },
        method,
    } = req;

    await dbConnect();

    switch (method) {
        // get a single user by id
        case "GET":
            try {
                let user = await User.findById(id)
                    .populate({
                        path: "reviews",
                        model: Review,
                        select: "bookid stars comment",
                    })
                    .exec();

                res.status(200).json({ data: user });
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
                console.log(req.body.password);

                // const user = await User.create(req.body);

                res.status(200).json({
                    message: "review is successfully added to database",
                    data: req.body.password,
                });
            } catch (error) {
                let message = (error as Error).message;
                let name = (error as Error).name;
                res.status(500).json({
                    error: `${name}${name ? "/ " : null}${message}`,
                });
            }
            break;
        // edit a single user by id
        case "PUT":
            try {
                const user = await User.findById(id);
                if (!user) throw new Error("can't find user");

                for (const key of Object.keys(req.body)) {
                    user[key] = req.body[key as keyof Partial<IUser>];
                }

                // reject data that can't be updated from this endpoint
                for (const key of Object.keys(req.body)) {
                    if (
                        key !== "name" &&
                        key !== "email" &&
                        key !== "password" &&
                        key !== "title" &&
                        key !== "bio"
                    ) {
                        throw new Error(
                            `${key} filed cannot be updated from this api endpoint`
                        );
                    }
                }

                await user.save();
                res.status(200).json({
                    message: "user is updated successfully",
                    data: user,
                });
            } catch (error) {
                let message = (error as Error).message;
                let name = (error as Error).name;
                res.status(500).json({
                    error: `${name}${name ? "/ " : null}${message}`,
                });
            }
            break;

        case "DELETE" /* Delete a model by its ID */:
            try {
                const user = await User.deleteOne({ _id: id });
                if (!user) throw new Error("User is not deleted");
                res.status(200).json({
                    message: "user is deleted successfully",
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
