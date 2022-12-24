import mongoose, { isObjectIdOrHexString, Schema } from "mongoose";

const BookSchema = new mongoose.Schema({
    _id: {
        type: String,
    },
    // it should be an array of reviews, this means that i need to make a nested model inside this.
    reviews: [
        {
            _id: {
                type: Schema.Types.ObjectId,
            },
            reviewer: {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
            stars: {
                type: Number,
                required: [true, "Please provide rating"],
            },
            comment: {
                type: String,
            },
        },
    ],
});

// i need to understand what is this or statment used for
export default mongoose.models.Book || mongoose.model("Book", BookSchema);
