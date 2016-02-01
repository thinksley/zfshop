var mongoose = require('mongoose');
module.exports = mongoose.model('Ware',new mongoose.Schema({
    name:String, //商品名称
    price:Number
}));