const User = require('../models/User');

exports.fetchUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id).populate('wishlist'); // Send full product details for wishlist
    res.status(200).json({
        id: user.id,
        email: user.email,
        role: user.role,
        addresses: user.addresses,
        wishlist: user.wishlist
    });
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndUpdate(id, req.body, { new: true }).populate('wishlist');
    res.status(200).json({
        id: user.id,
        email: user.email,
        role: user.role,
        addresses: user.addresses,
        wishlist: user.wishlist
    });
  } catch (err) {
    res.status(400).json(err);
  }
};