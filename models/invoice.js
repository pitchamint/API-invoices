const mongoose = require('mongoose')
const invoices = new mongoose.Schema({
    buyer_name: String,
    order: Object,
    totalprice: Number,
})

module.exports = mongoose.model('invoices',invoices)