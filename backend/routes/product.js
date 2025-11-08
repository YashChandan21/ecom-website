import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

// Get all products
router.get("/", async (req, res) => {
    try {
        const count = await Product.countDocuments();
        // seed if empty
        if(count == 0){
            await Product.insertMany([
                { name: "Vibe T-shirt", price: 499},
                { name: "Vibe Mug", price: 249},
                { name: "Vibe Cap", price: 299},
                { name: "Vibe Backpack", price: 1499},
                { name: "Vibe Stickers", price: 99},
            ]);
        }

        const products = await Product.find();
        res.json(products);
    } catch (err){
        res.status(500).json({ error: err.message });
    }
});

export default router;