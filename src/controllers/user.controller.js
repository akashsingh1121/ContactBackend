const express = require("express");
const router = express.Router();

const User = require("../models/user.model");

router.get("", async (req,res) => {
    try{
       const userdata = await User.find().lean().exec();

       return res.status(200).send({"users": userdata})
    }
    catch(err){
        return res.status(500).send({"error message" : err})
    }
})

router.post("", async (req,res) => {
    try{
       const data = await User.create(req.body);

       return res.status(200).send({"user": data})
    }
    catch(err){
        return res.status(500).send({"error message" : err.message})
    }
})


router.delete("/:id", async (req,res) => {
    try{
       const data = await User.findByIdAndDelete(req.params.id);

       return res.status(200).send(data)
    }
    catch(err){
        return res.status(500).send({"error message" : err.message})
    }
})

router.put("/:id", async (req,res) => {
    try{
       const data = await User.findByIdAndUpdate(req.params.id,req.body);

       return res.status(200).send(data)
    }
    catch(err){
        return res.status(500).send({"error message" : err.message})
    }
})

router.get("/:_id", async (req,res) => {
    try{
       const data = await User.findById(req.params._id).lean().exec();

       return res.status(200).send(data)
    }
    catch(err){
        return res.status(500).send({"error message" : err.message})
    }
})

router.put("/:id", async (req,res) => {
    try{
       const data = await User.findByIdAndUpdate(req.params.id,req.body);

       return res.status(200).send({updated:data,status:"updated successfully"})
    }
    catch(err){
        return res.status(500).send({"error message" : err.message})
    }
})

module.exports = router;