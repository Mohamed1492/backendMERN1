const mongoose=require('mongoose');
const shema= mongoose.Schema;
let productModel = new shema({
    nameProd : String,
    category : String,
    image : String,
    rented:Number,
    quantity:Number,
    date:String,
});
module.exports= mongoose.model("product",productModel)