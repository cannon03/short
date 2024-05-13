const mongoose=require('mongoose');
const ShortUniqueId = require("short-unique-id");
const { randomUUID } = new ShortUniqueId({ length: 10 });


const urlSchema={
    url:{
        type:String,
        required:true,
    },
    shortened:{
        type:String,
        required:true,
        default:randomUUID,
    }
}

module.exports=mongoose.model("url",urlSchema);