var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const invoiceModel = require('../models/invoice')
const { route } = require('.')

/* GET users listing. */
const connection = mongoose.connection 
connection.on('error', console.error.bind(console, 'connection error:'));
// connection.once('open', async function () {

//   const collection  = connection.db.collection("products");
//   collection.find({}).toArray(function(err, data){
    
//       let totalamount = data.filter((amount, index) =>{
//         // if(data.product_name == "caseiPad" || req.body.order.product_name == "caseiPad"){
//         //   data.amount - req.body.order
        
//         // }
//       })
//   });
  
// });
//create 
router.post('/',async function(req,res,next){
  // let orders = req.body.order
  // let a = orders.map((item)=>{
  //   let productname = item.product_name
  //   let amountname = item.amount
  //   return { productname,amountname }
  // })
  // console.log(a)
  // const connection = mongoose.connection 
  // connection.on('error', console.error.bind(console, 'connection error:'));
  connection.once('open', async function () {

    const collection  = connection.db.collection("products");
    collection.find({}).toArray(function(err, data){
      console.log(data)
        let totalamount = data.filter((amount, index) =>{
          if(data.product_name == "caseiPad" || req.body.order.product_name == "caseiPad"){
            data.amount - req.body.order
          
          }
        })
    });
    
  });
 
    // console.log(req.body.order)
    let product = req.body.order
    let totalprices = 0
    
    product.map((item)=>{
        totalprices = totalprices + item.price
        // console.log(totalprices)
    })
    try{
        let body = req.body
        let new_invoice = new invoiceModel({
          buyer_name: body.buyer_name,
          order: body.order,
          totalprice: totalprices
        })
        // let invoice = await new_invoice.save()
        return res.status(201).send({
            data: invoice, 
            message: 'create success',
            success: true,
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
        success: true,
      })
    }catch (err){
      return res.status(500).send({
        message: "server error",
        success: false,
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