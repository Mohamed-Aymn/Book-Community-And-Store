import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/dbConnect";
import Review from "../../../models/Review";
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
        // edit a single user by id
        case "PUT":
            interface IUser {
                name: string;
                password: string;
                email: string;
                title: string;
                about: string;
                readbooks: string[];
                reviews: string[];
            }

            let update: Partial<IUser> = {};
            let book = "";

            // handling request data by removeing empty fields
            for (const key in req.body) {
                if (req.body[key] !== "" && key !== "readBook") {
                    update[key as keyof Partial<IUser>] = req.body[key];
                } else if (key == "readBook") {
                    book = req.body[key];
                }
            }
            try {
                const user = await User.findById(id);
                if (!user) throw new Error("can't find user");

                for (const key of Object.keys(update)) {
                    user[key] = update[key as keyof Partial<IUser>];
                }

                if (book !== "") {
                    let test = user.readBooks.find((e: any) => e == book);
                    test ? false : user.readBooks.push(book);
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
