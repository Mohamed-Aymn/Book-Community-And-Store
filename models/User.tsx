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
    reviews: [{ type: Schema.Types.ObjectId, ref: "Book" }],
});

// i need to understand what is this or statment used for
export default mongoose.models.User || mongoose.model("User", UserSchema);
