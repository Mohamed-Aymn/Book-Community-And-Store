import mongoose, { Types, PopulatedDoc, Document } from "mongoose";

interface User {
    name?: string;
}

interface Review extends Document {
    reviewer?: PopulatedDoc<User & Document<Types.ObjectId>>;
    book: string;
    stars: number;
    comment: string;
}

const reviewSchema = new mongoose.Schema<Review>({
    reviewer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "please provide user's id"],
    },
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

export default mongoose.models.Review ||
    mongoose.model<Review>("Review", reviewSchema);
