import userModel from "../models/userModel.js";

//add to cart
const addToCart = async (req, res) => {
    try {
       let userData = await userModel.findOne({_id:req.body.userId}); // findById(req.body.userId) also can be used
       let cartData = userData.cartData || {};
       if(!cartData[req.body.itemId]){
        cartData[req.body.itemId]=1;
       }
       else{
        cartData[req.body.itemId]+=1;
       }
       await userModel.findByIdAndUpdate(req.body.userId, {cartData});
       res.json({ success:true, message: "Item added to cart successfully" });

    } catch (error) {
        console.error("Error in addToCart:", error);
        res.status(500).json({ success:false, message: "Error adding item to cart" });
    }
}

//remove from cart

const removeFromCart = async (req, res) => {
    try {
       let userData = await userModel.findById(req.body.userId);
       let cartData = await userData.cartData || {}; 
       if(cartData[req.body.itemId]>0){
        cartData[req.body.itemId]-=1;
       }
       await userModel.findByIdAndUpdate(req.body.userId, {cartData});
       res.json({ success:true, message: "Item removed from cart successfully" });
    } catch (error) {
        console.error("Error in removeFromCart:", error);
        res.status(500).json({ success:false, message: "Error removing item from cart" });
    }
}

//fetch user cart items

const getCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        res.json({ success:true, cartData });
    } catch (error) {
        console.error("Error in getCart:", error);
        res.status(500).json({ success:false, message: "Error fetching cart data" });
    }
}

export {addToCart, removeFromCart, getCart};