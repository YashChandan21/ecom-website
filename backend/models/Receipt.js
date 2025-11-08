import mongoose from "mongoose";

const receiptSchema = new mongoose.Schema({
    name: String,
    email: String,
    items: Array,
    total: Number,
    createdAt: { type: Date, default: Date.now}
});

export default mongoose.model("Receipt", receiptSchema);