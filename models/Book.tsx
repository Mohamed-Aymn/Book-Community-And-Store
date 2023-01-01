import mongoose from "mongoose";

const BookSchema = new mongoose.Schema({
    _id: {
        // as i will take google books api id
        type: String,
    },
    reviews: [
        {
            // as reviews id is monsoose object
            type: mongoose.Schema.Types.ObjectId,
            ref: "Review",
        },
    ],
    // as i may need to reach users from a specific book, not vice versa
    readers: [
        {
            // as users have normal object id
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    trial: String,
});

export default mongoose.models.Book || mongoose.model("Book", BookSchema);
// export const Book = mongoose.model("Book", BookSchema);
