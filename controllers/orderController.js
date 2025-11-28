const Order = require('../models/Order');
const Cart = require('../models/Cart');

exports.createOrder = async (req, res) => {
    try {
        // 1. Create the Order
        const order = new Order(req.body);
        const doc = await order.save();

        // 2. OPTIONAL: Clear the User's Cart after successful order
        // Assuming req.body.user contains the user ID
        await Cart.deleteMany({ user: req.body.user });

        res.status(201).json(doc);
    } catch (err) {
        res.status(400).json(err);
    }
};

exports.fetchOrdersByUser = async (req, res) => {
    const { userId } = req.params;
    try {
        const orders = await Order.find({ user: userId }).sort({ createdAt: -1 }); // Newest first
        res.status(200).json(orders);
    } catch (err) {
        res.status(400).json(err);
    }
};