const mongoose = require('mongoose');
const ObjectId = mongoose.Schema;
var product =  new  mongoose.Schema({
        name:{
            type:String,
            required:true,
            maxlength:32
        },
        price:{
            type:Number,
            required:true,
            default:0

        },
        stock:{
            type:Number
        },
        category:{
            type:ObjectId,
            ref:"Category"
        },
        photo:{
            type:Buffer,
            contentType:String
        }
},{timestamps:true});

module.exports = mongoose.model("product",product);