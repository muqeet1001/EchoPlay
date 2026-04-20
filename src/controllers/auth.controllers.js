import usermodel from "../models/user.models.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

async function registerUser(req, res) {
    try {
        const { username, email, password, role = 'user' } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const existingUser = await usermodel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await usermodel.create({ username, email, password: hashedPassword, role });
        const token = jwt.sign(
            { userId: user._id,role:user.role }, process.env.JWT_SECRET, { expiresIn: "1h" }
        );
        res.cookie("token", token, { httpOnly: true, secure: true, maxAge: 3600000 });
        res.status(201).json({ message: "User created successfully", user });
    }
    
    
    catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

async function loginUser(req,res) {
    try {
        const {username,email, password} = req.body;
        const user = await usermodel.findOne({
            $or:[
                {username:username},
                {email:email}
            ]
        });
        if(!user){
            return res.status(400).json({message: "User not found"});
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if(!isPasswordCorrect){
            return res.status(400).json({message: "Invalid password"});
        }
        const token = jwt.sign({userId: user._id,role:user.role}, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.cookie("token", token, { httpOnly: true, secure: true, maxAge: 3600000 });
        res.status(200).json({ message: "Login successful", user });
        return res.json({message: "Login successful", user});
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}
export { registerUser,loginUser }