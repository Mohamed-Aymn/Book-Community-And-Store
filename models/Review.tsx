import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    reviewer: {
        required: [true, "Please provide an email for this user"],
    },
    stars: {
        type: Number,
        required: [true, , "Please provide a password for this user"],
    },
    comment: {
        type: String,
        maxlength: [60, "Name cannot be more than 60 characters"],
    },
});

// i need to understand what is this or statment used for
export default mongoose.models.Review || mongoose.model("Review", reviewSchema);
