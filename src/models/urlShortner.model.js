import mongoose, { mongo } from "mongoose";

const shortUrlSchema = mongoose.Schema({
    completeUrl: {
        type: String,
        required: true
    },
    shortUrl: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    clicks: {
        type: Number,
        required: true,
        default: 0
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }
}, {timestamps: true});

export const shortUrl = mongoose.model("ShortUrl", shortUrlSchema);