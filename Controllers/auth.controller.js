import User from "../Models/user.model.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import nodemailer from "nodemailer";

export const register = async (req, res) => {
    try {
        const {username, email, password} = req.body;

        const userExists = await User.findOne({email});
        if(userExists){
            return res.status(400).json({message: "User already exists"});
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            username,
            email,
            password: hashedPassword,

             
        });

       res.status(201).json({message: "User registered successfully"});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

export const forgotPassword = async (req, res) => {
    try {
        const {email} = req.body;

        const user = await User.findOne({email});
        if(!user)
            return res.status(404).json({message: "User not found"});

        const token = crypto.randomBytes(32).toString("hex");

        user.resetToken = token;
        user.resetTokenExpiry = Date.now() + 15 * 60 * 1000;
        await user.save();
        console.log("Saved user:", user);

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            },
        });

        const resetLink = `${process.env.CLIENT_URL}/reset/${token}`;

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: "Password Reset",
            text: `Click this link to reset: ${resetLink}`,
        });

        res.json({message: "Reset link sent to email"});

    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

export const resetPassword = async (req,res) => {
    try {
        const {token} = req.params;
        const {password} = req.body;

        console.log("Token from URL:", token);

        const user = await User.findOne({
            resetToken: token,
            // resetTokenExpiry: {$gt: Date.now()}
        });

        console.log("User found with this token:", user);
        
        if(!user)
            return res.status(400).json({message: "Invalid or expired token"});

        if(user.resetTokenExpiry < Date.now())
            return res.status(400).json({message: "Token expired"});

        const hashedPassword = await bcrypt.hash(password, 10);

        user.password = hashedPassword;
        user.resetToken = undefined;
        user.resetTokenExpiry = undefined;

        await user.save();

        res.json({message: "Password reset successful"});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};