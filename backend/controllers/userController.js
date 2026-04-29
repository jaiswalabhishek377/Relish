import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import validator from "validator";


// login user
const loginUser= async(req,res)=>{
    const {email,password}=req.body;
    try {
        const user = await userModel.findOne({email});
        if(!user){
            return res.status(400).json({success:false, message:"User not found"})
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({success:false, message:"Invalid credentials"})
        }
        //generate token
        const token = createToken(user._id);
        res.json({success:true,token});

    } catch (error) {
        console.error("Error in loginUser:", error);
        return res.status(500).json({success:false, message:"Error occurred while logging in user"})
    }
}

const createToken =(id)=>{
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn:"1d"})
}


//register user
const registerUser= async(req,res)=>{
    const {name,password,email}=req.body;
    try {
        //check if user already exists
        const exists = await userModel.findOne({email});
        if(exists){
            return res.status(400).json({success:false, message:"User already exists"})
        }

        //validate email and password
        if(!validator.isEmail(email)){ // check if the email is valid
            return res.status(400).json({success:false, message:"Invalid email"})
        }
        if(password.length<8){
            return res.status(400).json({success:false, message:"Password must be at least 8 characters long"})
        }
        //hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)
        const newUser = new userModel({
            name:name,
            email:email,
            password:hashedPassword
        })
        const user = await newUser.save();
        //generate token
        const token = createToken(user._id);
        res.json({success:true,token});

    } catch (error) {
        console.error("Error in registerUser:", error);
        return res.status(500).json({success:false, message:"Error occurred while registering user"})
    }
}

export { loginUser, registerUser }