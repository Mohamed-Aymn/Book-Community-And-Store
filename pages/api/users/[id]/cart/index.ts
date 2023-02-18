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

    await dbConnect();

    switch (method) {
        case "GET":
            try {
                let items = await User.findById(id)
                    .select("cart")
                    .populate({
                        path: "cart",
                        model: Book,
                    })
                    .exec();
                res.status(200).json({
                    data: items,
                });
            } catch (error) {
                let message = (error as Error).message;
                let name = (error as Error).name;
                res.status(500).json({
                    error: `${name}${name ? "/ " : null}${message}`,
                });
            }
            break;
        case "PUT":
            try {
                const book = req.body.book;
                const count = req.body.count;

                let user = await User.findById(id);

                user.cart.map((item: { book: string; count: number }) => {
                    if (item.book === book) {
                        throw new Error("book already exists");
                    }
                });
                user.cart.push({
                    book,
                    count,
                });
                await user.save();

                res.status(200).json({
                    message: "item added to cart successfully",
                    // data: user,
                });
            } catch (error) {
                let message = (error as Error).message;
                let name = (error as Error).name;
                res.status(500).json({
                    error: `${name}${name ? "/ " : null}${message}`,
                });
            }
            break;
        case "POST" /* to update count of a specific book */:
            try {
                const book = req.body.book;
                const count = req.body.count;

                let user = await User.findById(id);
                user.cart.map((item: { book: string; count: number }) => {
                    if (item.book === book && count !== 0) {
                        item.count = count;
                    } else if (item.book === book && count === 0) {
                        user.cart.pop(item);
                    }
                });

                await user.save();

                res.status(200).json({
                    message: "item updated successfully",
                });
            } catch (error) {
                let message = (error as Error).message;
                let name = (error as Error).name;
                res.status(500).json({
                    error: `${name}${name ? "/ " : null}${message}`,
                });
            }
            break;
        case "DELETE":
            try {
                let user = await User.findById(id);
                user.cart = [];
                user.save();

                res.status(200).json({
                    message: "all cart items deleted successfully",
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
