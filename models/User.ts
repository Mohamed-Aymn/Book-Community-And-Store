import mongoose from "mongoose";
import { MdOutlineSettingsInputComposite } from "react-icons/md";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        maxlength: [60, "Name cannot be more than 60 characters"],
        required: [true, "Please enter your name"],
    },
    email: {
        type: String,
        required: [true, "Please provide an email for this user"],
        unique: true,
        lowercase: true,
        match: [
            /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/g,
            "Please fill a valid email address",
        ],
    },
    password: {
        type: String,
    },
    title: {
        type: String,
    },
    followers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    following: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    bio: {
        type: String,
    },
    readBooks: [
        {
            type: String,
            ref: "Book",
        },
    ],
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Review",
        },
    ],
    favouriteGenres: [
        {
            type: String,
        },
    ],
    cart: [
        {
            type: String,
            ref: "Book",
        },
    ],
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
