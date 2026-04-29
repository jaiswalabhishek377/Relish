import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId:{type:String,required:true},
    items:{type:Array,required:true}, // {itemId:quantity}
    amount:{type:Number,required:true},
    address:{type:Object,required:true}, // {street,city,state,country,zip}
    status:{type:String,default:"Food Processing"}, // processing, completed, cancelled
    date:{type:Date,default:Date.now()},
    payment:{type:Boolean,required:true}
})

const orderModel = mongoose.models.order || mongoose.model("orders",orderSchema);
export default orderModel;