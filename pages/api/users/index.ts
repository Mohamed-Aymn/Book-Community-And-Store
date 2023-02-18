import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/dbConnect";
import User from "../../../models/User";
import bcrypt from "bcrypt";

interface Data {
    error?: string;
    data?: object;
    message?: string;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    await dbConnect();
    const {
        query: { name, email },
        method,
    } = req;

    // const handleErrors = (err) => {
    //     console.log(err.message, err.code);
    //     let errors = { email: "", password: "" };

    //     // duplicate email error
    //     if (err.code === 11000) {
    //         errors.email = "that email is already registered";
    //         return errors;
    //     }

    //     // validation errors
    //     if (err.message.includes("user validation failed")) {
    //         // console.log(err);
    //         Object.values(err.errors).forEach(({ properties }) => {
    //             // console.log(val);
    //             // console.log(properties);
    //             errors[properties.path] = properties.message;
    //         });
    //     }

    //     return errors;
    // };

    switch (method) {
        // find all users
        case "GET":
            try {
                // error message needs to be handled here
                let users;
                if (name) {
                    const regex = new RegExp(`${name}`, "i");
                    users = await User.find({ name: { $regex: regex } });
                } else if (email) {
                    const regex = new RegExp(`${email}`);
                    users = await User.find({ email: { $regex: regex } });
                } else {
                    users = await User.find({});
                }

                res.status(200).json({ data: users });
            } catch (error) {
                let result = (error as Error).message;
                let name = (error as Error).name;
                res.status(500).json({
                    error: `${name}${name ? "/ " : null}${result}`,
                });
            }
            break;
        // create a new user
        case "POST":
            try {
                if (!req.body) throw new Error("form data is requried");

                const { email } = req.body;
                const checkExisting = await User.findOne({ email });
                if (checkExisting) throw new Error("user Already Exists");

                // password validation logic, as mongoose will not catch errors of the hashed password
                if (req.body.password.length < 6) {
                    const error = new Error(
                        "password should be more than 6 characters"
                    );
                    error.name = "ValidationError";
                    throw error;
                }

                req.body.password = await bcrypt.hash(req.body.password, 12);

                const user = await User.create(req.body);
                res.status(200).json({
                    message: "users is successfully created",
                    data: user,
                });
            } catch (error) {
                // const errors = handleErrors(error);
                // res.status(400).json({ errors });

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
