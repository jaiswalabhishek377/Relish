import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// placing user order for frontend
const placeOrder = async (req,res)=>{
    const frontend_url = "http://localhost:5173"; // frontend url

    try {
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
            payment: req.body.payment || false
        })
        await newOrder.save();

        const line_items = req.body.items.map((item)=>({
            price_data: {
                currency: "inr",
                product_data: {
                    name: item.name,
                },
                unit_amount: item.price*100*85, // dollar* 100 to convert in cents and *82 for conversion rate of dollar to inr
            },
            quantity: item.quantity,
        }))
        line_items.push({
            price_data:{
                currency: "inr",
                product_data:{
                    name:"Delivery Charges"
                },
                unit_amount: 10*100*85, // 10 dollars delivery charges
            },
            quantity:1
        })
        const session = await stripe.checkout.sessions.create({
            line_items:line_items,
            mode:"payment",
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`
        })

        res.json({ success:true, message: "Order placed successfully", session_url: session.url });
    } catch (error) {
        console.log("Error in placeOrder:", error);
        res.status(500).json({ success:false, message: "Error placing order" });
    }
}

const verifyOrder = async (req,res)=>{
    const {orderId,success,userId} = req.body;
    try {
        if(success=="true"){
            await orderModel.findByIdAndUpdate(orderId, {payment:true});
            await userModel.findByIdAndUpdate(userId, {cartData:{}}); // after placing order cart data will be empty
            res.json({ success:true, message: "Payment successful!" });
        }
        else{
            await orderModel.findByIdAndDelete(orderId); // if payment is not successful then delete that order from db
            res.json({ success:false, message: "Payment failed " });
        }
    } catch (error) {
        console.log("Error in verifyOrder:", error);
        res.status(500).json({ success:false, message: "Error verifying order" });
    }
}

//user orders for frontend

const userOrders = async (req,res)=>{
    try {
        const orders = await orderModel.find({userId: req.body.userId});
        res.json({ success:true, orders });
    } catch (error) {
        console.log("Error in userOrders:", error);
        res.status(500).json({ success:false, message: "Error fetching user orders" });
    }
}

//Listing orders for admin panel

const listOrders = async (req,res)=>{
    try {
        const orders = await orderModel.find({});
        res.json({ success:true, orders });
    } catch (error) {
        console.log("Error in listOrders:", error);
        res.status(500).json({ success:false, message: "Error fetching orders" });
    }
}

// updating the order status for admin panel
const updateStatus = async (req,res)=>{
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId, {status: req.body.status});
        res.json({ success:true, message: "Order status updated successfully" });
    } catch (error) {
        console.log("Error in updateStatus:", error);
        res.status(500).json({ success:false, message: "Error updating order status" });
    }
}

export { verifyOrder,placeOrder,userOrders,listOrders,updateStatus };