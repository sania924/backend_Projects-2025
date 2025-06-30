const mongoose=require('mongoose');
const productSchema=new mongoose.Schema({
    name:{type:String,required:[true,'Product name is required']},
    quantity:{type:Number, default:0, required:[true,'Product quantity is required']},
    price:{type:Number,default:0,required:[false,'Product price  is required']},
},{timestamps:true});
module.exports=mongoose.model('Product',productSchema);