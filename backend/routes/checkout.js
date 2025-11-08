import express from "express";
import CartItem from "../models/CartItem.js";
import Receipt from "../models/Receipt.js";

const router = express.Router();

router.post("/", async(req, res) => {
    const { name, email } = req.body;

    try{
        const items = await CartItem.find().populate("productId");
        if(!items.length) return res.status(400).json({ error: "Cart empty"});

        const mapped = items.map((i) => ({
            name: i.productId.name,
            qty: i.qty,
            price: i.productId.price,
            lineTotal: i.qty * i.productId.price
        }));

        const total = mapped.reduce((sum, i) => sum + i.lineTotal, 0);

        const receipt = await Receipt.create({ name, email, items: mapped, total});
        await CartItem.deleteMany();

        res.json({ receipt });
    } catch(err){
        res.status(500).json({ error: err.message});
    }
});

export default router;