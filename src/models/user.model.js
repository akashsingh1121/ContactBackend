const mongoose = require("mongoose");

const User = new mongoose.Schema({
        name : { type : String, required: true },
        image: {type : String, required:true},
        email : { type : String},
        number : { type : Number, required: true},
        company : { type : String},
        DOB: {type:Date}
},{
       versionKey:false,
       timestamps: true
})


module.exports = mongoose.model("users",User);