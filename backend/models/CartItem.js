import mongoose, { mongo, Schema } from "mongoose";

const cartItemSchema = new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product"},
    qty: { type: Number, default: 1}
});

export default mongoose.model("CarrItem", cartItemSchema);