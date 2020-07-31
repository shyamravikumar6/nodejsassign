const mongoose = require('mongoose');
const user = require('./user');
const product = require('./product');
const ObjectId = mongoose.Schema;
const ProductCart = new mongoose.Schema({
    product:{
        type:ObjectId,
        ref:product
    },
    quantity:Number,
    amount:Number,

})
const Order = new mongoose.Schema({
    product:[ProductCart],
    transction_id:{},
    amount:Number,
    user:{
        type:ObjectId,
        ref:user
    }
});

 const order1 = mongoose.model("Oder",Order);
 const Product1 = mongoose.model("Product1",ProductCart);
 module.exports =({order1,Product1});