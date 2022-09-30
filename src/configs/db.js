const mongoose = require("mongoose");

module.exports = () =>{
    return mongoose.connect("mongodb+srv://Contact:contact123@cluster0.4dru2kr.mongodb.net/?retryWrites=true&w=majority")
}