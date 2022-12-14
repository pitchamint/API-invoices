var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const userModel = require('../models/user.js')
const { route } = require('.')


/* GET users listing. */
//create 
router.post('/',async function(req,res,next){
  try{
      let body = req.body
      let new_user = new userModel({
        user_name: body.user_name,
        password: body.password,
        fname: body.fname,
        lname: body.lname,
        age: body.age,
        gender: body.gender
      })
      let user = await new_user.save()
      return res.status(201).send({
          data: user, 
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
    await userModel.updateOne(
      { _id: mongoose.Types.ObjectId(id) },
      { $set: req.body }
    )
    let user = await userModel.findById(id)
    return res.status(201).send({
      data: user,
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
    await userModel.deleteOne({ _id: mongoose.Types.ObjectId(id)})
    let user = await userModel.find()
    return res.status(201).send({
      data: user,
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
    let user = await userModel.find()
    return res.status(200).send({
      data: user,
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
    let user = await userModel.findById(id)
    return res.status(200).send({
      data: user,
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