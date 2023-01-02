import mongoose from "mongoose";

const BookSchema = new mongoose.Schema({
    _id: {
        type: String,
    },
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Review",
        },
    ],
    readers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    trial: String,
});

export default mongoose.models.Book || mongoose.model("Book", BookSchema);
