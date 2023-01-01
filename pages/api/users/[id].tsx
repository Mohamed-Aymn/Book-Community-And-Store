// this will handle api for a specific user http://localhost:3000/api/users/63a4c070924343ecf3d146f3

import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/dbConnect";
import Review from "../../../models/Review";
import User from "../../../models/User";

// type Data = {
//     name: string;
// };

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
        case "GET" /* get a user by his specific id */:
            try {
                const user = await User.findById(id)
                    .populate({
                        path: "reviews",
                        modle: Review,
                        select: "bookid stars comment",
                    })
                    // i don't need to populate book data as i don't have it's data in mongodb
                    // .populate({
                    //     path: "books",
                    //     modle: Book,
                    //     select: "_id",
                    // })
                    .exec();

                res.status(200).json({
                    user,
                });
            } catch (error: any) {
                res.status(500).json({ error: error.message });
            }
            break;
        case "PUT" /* Edit a model by its ID */:
            let update = {};
            let book;
            for (const [key, value] of Object.entries(req.body)) {
                // console.log(key);
                if (req.body[key] !== "" && key !== "readBook") {
                    update[key] = req.body[key];
                } else if (key == "readBook") {
                    book = req.body[key];
                }
            }
            try {
                const user = await User.findById(id);
                if (!user) {
                    return res.status(400).json({ success: false });
                }
                for (const key of Object.keys(update)) {
                    user[key] = update[key];
                }
                if (book) {
                    let test = user.readBooks.find((e: any) => e == book);
                    test ? false : user.readBooks.push(book);
                    // console.log(test);
                    // for (let i in user.books) {
                    //     user.books[i] == book ? null : user.books.push(book);
                    // }
                }
                user.save();
                res.status(200).json({ success: true, data: user });
                // user.save().then((savedDoc: any) => {
                //     res.status(200).json({ success: true, data: savedDoc });
                // });
            } catch (error: any) {
                res.status(400).json({ success: error.message });
            }
            break;

        case "DELETE" /* Delete a model by its ID */:
            try {
                const deleteUser = await User.deleteOne({ _id: id });
                if (!deleteUser) {
                    return res.status(400).json({ success: false });
                }
                res.status(200).json({ success: true, data: {} });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;

        default:
            res.status(400).json({ success: false });
            break;
    }
}
