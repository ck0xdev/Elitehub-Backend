const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    rating: { type: Number, default: 0 },
    category: { type: String, required: true },
    stock: { type: Number, default: 0 },
    avatar: { type: String, required: false } // URL or filename
});

// Add a virtual 'id' field that converts _id to string
const virtual = productSchema.virtual('id');
virtual.get(function () {
    return this._id;
});

productSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) { delete ret._id; }
});

module.exports = mongoose.model('Product', productSchema);