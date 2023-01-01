import mongoose, { Schema } from "mongoose";

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Please provide an email for this user"],
    },
    password: {
        type: String,
        required: [true, , "Please provide a password for this user"],
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
            // as books have string google books id
            type: String,
            ref: "Book",
        },
    ],
    reviews: [
        {
            // as reviews have normal object id
            type: mongoose.Schema.Types.ObjectId,
            ref: "Review",
        },
    ],
});

// i need to understand what is this or statment used for
export default mongoose.models.User || mongoose.model("User", UserSchema);

// export const User = mongoose.model("User", UserSchema);
