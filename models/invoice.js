const mongoose = require('mongoose')
const invoices = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    buyer_name: { type: String, required: true },
    order: [{ type: Object, ref: 'products', required: true },{amount:Number}],
    // totalprice: { type: Number, required: true },
})

module.exports = mongoose.model('invoices',invoices)