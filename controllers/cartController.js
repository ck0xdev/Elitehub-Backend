const Cart = require('../models/Cart');

exports.addToCart = async (req, res) => {
    try {
        // Check if item already exists for this user
        const existing = await Cart.findOne({ user: req.body.user, product: req.body.product });
        
        if (existing) {
            // If exists, update quantity
            existing.quantity += req.body.quantity;
            const doc = await existing.save();
            const result = await doc.populate('product');
            return res.status(201).json(result);
        }

        // If new, create it
        const cart = new Cart(req.body);
        const doc = await cart.save();
        const result = await doc.populate('product');
        res.status(201).json(result);
    } catch (err) {
        res.status(400).json(err);
    }
};

exports.fetchCartByUser = async (req, res) => {
    const { user } = req.query;
    try {
        const cartItems = await Cart.find({ user }).populate('product');
        res.status(200).json(cartItems);
    } catch (err) {
        res.status(400).json(err);
    }
};

exports.deleteFromCart = async (req, res) => {
    const { id } = req.params;
    try {
        await Cart.findByIdAndDelete(id);
        res.status(200).json({ id });
    } catch (err) {
        res.status(400).json(err);
    }
};

exports.updateCart = async (req, res) => {
    const { id } = req.params;
    try {
        const cart = await Cart.findByIdAndUpdate(id, req.body, { new: true }).populate('product');
        res.status(200).json(cart);
    } catch (err) {
        res.status(400).json(err);
    }
};