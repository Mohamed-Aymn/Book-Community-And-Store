import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    reviewer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "please provide user's id"],
    },
    // i inserted book id because i may need to reach all reviews in the home page without reaching the book first
    book: {
        // as book id is taken form google books api
        type: String,
        required: [true, "please provide book's id"],
    },
    stars: {
        type: Number,
        required: [true, "Please provide a password for this user"],
    },
    comment: {
        type: String,
        required: [true, "please provide comment"],
        maxlength: [60, "Name cannot be more than 60 characters"],
    },
});

// i need to understand what is this or statment used for
export default mongoose.models.Review || mongoose.model("Review", reviewSchema);

// export const Review = mongoose.model("Review", reviewSchema);
