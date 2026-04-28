import foodModel from "../models/foodModel.js";
import fs from "fs";


// add food item

const addFood = async (req, res) => {
    let image_filename=`${req.file.filename}`; // requesting file name from frontend and storing in variable

    const food = new foodModel({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        category:req.body.category,
        image:image_filename
    })

    try {
        await food.save();
        res.status(201).json({ success:true, message: "Food item added successfully" });
    } catch (error) {
        res.status(500).json({ success:false, message: "Error adding food item" });
    }}

// all food list
const listFood = async (req, res) => {
    try {
        const foods= await foodModel.find({}); // to fetch all food items from database how {} is used in find method to fetch all items
        res.json({ success:true, foods });
    } catch (error) {
        res.status(500).json({ success:false, message: "Error fetching food items" });
    }
}

//remove food item

const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id); // to find food item by id from database
        if (!food) {
            return res.status(404).json({ success:false, message: "Food item not found" });
        }
        // delete image from uploads folder
        fs.unlink(`uploads/${food.image}`, (err) => {
            if (err) {
                console.error("Error deleting image:", err);
            }
        });
        await foodModel.deleteOne({_id: req.body.id}); // to delete food item from database
        res.json({ success:true, message: "Food item removed successfully" });
    } catch (error) {
        res.status(500).json({ success:false, message: "Error removing food item" });
    }
}

export {addFood, listFood, removeFood};