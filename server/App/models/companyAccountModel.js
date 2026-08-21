let mongoose =require("mongoose")

let companyAccountSchema= new mongoose.Schema({
    Name:{
        type:String,
        required:true,
    },
    Email:{
        type:String,
        required:true,
        unique:true
    },
    Mobilenumber:{
        type:String,
        required:true
    },
    Address:{
        type:String,
        required:true
    },
    MapUrl:{
        type:String,
        // required:true,
    },
    imageLogo:{
        type:String,
        required:true,
    },
    Facebook:{
        type:String,
        // required:true
    },
     Youtube:{
        type:String,
        // required:true
    },
    Twitter:{
        type:String,
        // required:true
    },
    Instagram:{
        type:String,
        // required:true
    },
whatsapp:{
    type:String,
    // required:true
},
})
let companyAccountSchemaModel=mongoose.model("companyAccount",companyAccountSchema)
module.exports={companyAccountSchemaModel}
