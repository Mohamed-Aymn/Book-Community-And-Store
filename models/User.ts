import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Please provide an email for this user"],
        unique: true,
        lowercase: true,
        validate: [
            /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/g,
            "Please enter a valid email",
        ],
    },
    password: {
        type: String,
        required: [true, "Please enter a password"],
        minlength: [6, "Minimum password length is 6 characters"],
    },
    name: {
        type: String,
        maxlength: [60, "Name cannot be more than 60 characters"],
    },
    title: {
        type: String,
    },
    about: {
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
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
