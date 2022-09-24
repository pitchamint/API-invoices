var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const invoiceModel = require('../models/invoice')
const productModel = require('../models/product')
const { route } = require('.')

/* GET users listing. */
//create 
router.post('/',async function(req,res,next){
  
  //บวกผลรวม
  let product = req.body.order
  let totalprices = 0
    product.map((item)=>{
        totalprices = totalprices + item.product.price
        product.push(totalprices)
    })
    
    try{
        let body = req.body
        let new_invoice = new invoiceModel({
          _id: mongoose.Types.ObjectId(),
          buyer_name: body.buyer_name,
          order: body.order,
          totalprice: totalprices,
        })
        // คำนวนยอดสินค้าคงคลัง
        let product = req.body.order
        product.map(async(item)=>{
          let orderID = await item.product._id
          console.log(orderID,"fffffff")
          // let productData = await productModel.findById(mongoose.Types.ObjectId(orderID))
          // let productStrock = productData.strock
          // let orderAmount = item.amount
          //   totalStrock = productStrock - orderAmount
          //ยัดค่า totalstrock เข้าไปใน invoice order ก่อน
          // await productModel.updateOne(
          //   {_id: mongoose.Types.ObjectId(orderID)},
          //   {$set:{strock:totalStrock}}
          // )
          
        })
        // let invoice = await new_invoice.save()
        return res.status(201).send({
            // data: invoice, 
            message: 'create success',
            success: true
        })
  
    }catch (err){
        return res.status(500).send({
            message: err.message,
            success: false,
        })
    }
})

//getAll
router.get("/", async function(req, res, next){
  try{
    let invoice = await invoiceModel.find()
    return res.status(200).send({
      data: invoice,
      message: "success",
      success: true
    })
  }catch (err){
    return res.status(500).send({
      message: "server error",
      success: "false"
    })
  }
    
})

//getByID
router.get("/:id", async function(req, res, next){
    try{
      let id = req.params.id
      if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).send({
          message: "id Invalid",
          success: false,
          error: ["id is not a ObjectId"]
        })
      }
      let invoice = await invoiceModel.findById(id)
      return res.status(200).send({
        data: invoice,
        message: "success",
        success: true,
      })
    }catch (err){
      return res.status(500).send({
        message: "server error",
        success: false,
      })
    }
  })

  module.exports = router;