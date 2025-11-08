import express from "express";
import CartItem from "../models/CartItem.js";
import Product from "../models/Product.js";

const router = express.Router();

// Add to cart
router.post("/", async (req, res) => {
    const { productId, qty } = req.body;
    if(!productId || qty < 1)
        return res.status(400).json({ error: "Invalid data"});

    try{
        const product = await Product.findById(productId);
        if(!product) return res.status(404).json({ error: "Product not found"});

        const cardItem = await CartItem.create({ productId, qty});
        res.status(201).json(cardItem);
    } catch(err){
        res.status(500).json({ error: err.message});
    }
});

// Get cart
router.get("/", async (_, res) => {
    try{
        const items = await CartItem.find().populate("productId");
        const detailed = items.map((item) => ({
            _id: item._id,
            name: item.productId.name,
            price: item.productId.price,
            qty: item.qty,
            lineTotal: item.productId.price * item.qty
        }));

        const total = detailed.reduce((sum, i) => sum + i.lineTotal, 0);
        res.json({ items: detailed, total });
    } catch(err){
        res.status(500).json({ error: err.message});
    }
});

// Delete from cart
router.delete("/:id", async (req, res) => {
    try{
        await CartItem.findByIdAndDelete(req.params.id);
        res.json({ ok: true});
    } catch(err){
        res.status(500).json({ error: err.message});
    }
});

export default router;