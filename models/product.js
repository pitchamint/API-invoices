const mongoose = require('mongoose')

const products = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    product_name: { type: String, required: true },
    detail: { type: String,required: true},
    price: { type: Number, required: true },
    amount: { type: Number, required: true }
})

module.exports = mongoose.model('products',products)