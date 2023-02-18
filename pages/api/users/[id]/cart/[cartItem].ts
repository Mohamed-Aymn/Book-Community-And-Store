import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../../../lib/dbConnect";
import Book from "../../../../../models/Book";
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
    let id = query.id;
    let book = query.cartItem;

    await dbConnect();

    switch (method) {
        case "DELETE":
            let user = await User.findById(id);

            user.cart.map((item: { book: string; count: number }) => {
                if (item.book === book) {
                    user.cart.pop(item);
                }
            });
            user.save();

            try {
                res.status(200).json({
                    message: "cart Item deleted successfully",
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
