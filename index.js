const  express     = require("express");
const connect      = require("./src/configs/db");
const User         = require("./src/controllers/user.controller")
const cors         = require("cors")
const app          = express();
const bodyparser   = require("body-parser");
const csv          = require('csvtojson');
const multer       = require("multer");
const Usermodel    = require("./src/models/user.model");
const { Parser }   = require("json2csv");
const fs           = require("fs");

const storage = multer.diskStorage({
   destination : (req,file,cb)=>{
     cb(null,"./uploads")
   },
   filename : (req,file,cb)=>{
    cb(null,file.originalname)
  }
})

const uploads = multer({storage:storage});

app.use(cors({ origin:"*"}))
app.use(bodyparser.json({limit:"50mb"}));
app.use(bodyparser.urlencoded({limit: '50mb', extended: true}));
app.use(express.json());
app.use("/users", User);
app.post("/upload",uploads.single("csv"),async (req,res) =>{
    try{
       const csvFilePath=req.file.path
       csv()
       .fromFile(csvFilePath)
       .then((jsonObj)=>{
          console.log(jsonObj)
           Usermodel.insertMany(jsonObj)
           return res.send({results:"Import File successfully"})
       })
    }catch(err){
        return res.status(500).send(err.message);
    }
});

const fields = ['name', 'number',"email"];
const opts = { fields };
app.get("/export",async(req,res)=>{
    try{
        const data = await Usermodel.find()
        const parser = new Parser(opts);
        const csv = parser.parse(data);
        res.attachment("Contact.csv");
        return res.send(csv);
    }catch(err){
        return res.status(500).send(err.message)
    }
})
app.set("view engine","hbs")
app.get("/",(req,res)=>{
    res.render("index")
  })


app.listen(process.env.PORT || 5000,async()=>{
    try{
       await connect();
    }catch(err){
        console.log(err)
    }
    console.log("listening port 5000")
})