import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/dbConnect";
import Review from "../../../models/Review";
import User from "../../../models/User";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
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
                User.findById(id)
                    .populate({
                        path: "reviews",
                        model: Review,
                        select: "bookid stars comment",
                    })
                    .exec(function (err, user) {
                        if (err) throw new Error(err.message);
                        res.status(200).json({
                            user,
                        });
                    });
            } catch (error: any) {
                res.status(500).json({ error: error.message });
            }
            break;
        // edit a single user by id
        case "PUT":
            interface Update {
                name?: string;
                password?: string;
                email?: string;
                title?: string;
                about?: string;
                readbooks?: Array<String>;
                reviews?: Array<String>;
            }

            let update: Update = {};
            let book = "";

            // handling request data by removeing empty fields
            for (const key in req.body) {
                if (req.body[key] !== "" && key !== "readBook") {
                    update[key as keyof Update] = req.body[key];
                } else if (key == "readBook") {
                    book = req.body[key];
                }
            }
            try {
                const user = await User.findById(id);
                if (!user) throw new Error("can't find user");

                for (const key of Object.keys(update)) {
                    user[key] = update[key as keyof Update];
                }

                if (book !== "") {
                    let test = user.readBooks.find((e: any) => e == book);
                    test ? false : user.readBooks.push(book);
                }
                await user.save();
                res.status(200).json({
                    success: true,
                    message: "user is updated successfully",
                    data: user,
                });
            } catch (error: any) {
                res.status(400).json({ error: error.message });
            }
            break;

        case "DELETE" /* Delete a model by its ID */:
            try {
                const user = await User.deleteOne({ _id: id });
                if (!user) throw new Error("User is not deleted");
                res.status(200).json({
                    success: true,
                    message: "user is deleted successfully",
                });
            } catch (error: any) {
                res.status(400).json({ error: error.message });
            }
            break;

        default:
            res.status(400).json({ success: false });
            break;
    }
}
