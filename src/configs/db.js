const mongoose = require("mongoose");

module.exports = () =>{
    return mongoose.connect("mongodb+srv://ackyrajput0:121contact@cluster12.xizotia.mongodb.net/?retryWrites=true&w=majority&appName=Cluster12")
}
