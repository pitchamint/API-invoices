var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const productsModel = require('../models/product')
const { route } = require('.');
const { request } = require('../app');



/* GET users listing. */
//create 
router.post('/',async function(req,res,next){
  try{
      let body = req.body
      let new_product = new productsModel({
        _id: new mongoose.Types.ObjectId(),
        product_name: body.product_name,
        detail: body.detail,
        price: body.price,
        amount: body.amount,
      })
      await new_product.save()
      .then(result => {
        console.log(result)
        return res.status(201).send({
        message: 'create success',
        success: true,
        createdProduct: {
          product_name: result.product_name,
          price: result.price,
          _id: result._id,
          request: {
            type: 'GET',
            url: "http://localhost:3000/products/" + result._id
          }
        }
        })
      })
  }catch (err){
      return res.status(500).send({
          message: err.message,
          success: false,
      })
  }
})

//update
router.put("/:id", async function(req, res, next){
  try{
    let id = req.params.id
    if(!mongoose.Types.ObjectId.isValid(id)){
      return res.status(400).send({
        message: "id Invalid",
        success: false,
        error: ["id is not a ObjectId"]
      })
    }
    await productsModel.updateOne(
      { _id: mongoose.Types.ObjectId(id) },
      { $set: req.body }
    )
    let product = await productsModel.findById(id)
    return res.status(201).send({
      data: product,
      message: "update success",
      success: true,
    })
  }catch (err){
    return res.status(500).send({
      message: "update fail",
      success: false,
    })
  }
})

//delete
router.delete("/:id", async function (req, res, next){
  try{
    let id = req.params.id
    if(!mongoose.Types.ObjectId.isValid(id)){
      return res.status(400).send({
        message: "id Invalid",
        success: false,
        error: ["id is not a ObjectId"]
      })
    }
    await productsModel.deleteOne({ _id: mongoose.Types.ObjectId(id)})
    let product = await productsModel.find()
    return res.status(201).send({
      data: product,
      message: "daelete success",
      success: true,
    })
  }catch (err){
    return res.status(500).send({
      message: "delete fail",
      success: false,
    })
  }
})

//get all user
router.get("/", async function(req, res, next){
  try{
    let product = await productsModel.find()
    return res.status(200).send({
      data: product,
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

//get user By id
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
    let product = await productsModel.findById(id)
    return res.status(200).send({
      data: product,
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