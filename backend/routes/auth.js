import express from "express";
const addUser = express.Router();
import { UserModel } from "../models/UserModel.js";
import { validateData } from "../utils/validate.js";
import bcrypt from "bcrypt"

addUser.post("/signup" , async (req , res)=>{
    const body = req.body;
    const {email , password} = body;
    try {
        const isDataValid = validateData(body);
        if(isDataValid){
            const hashedPassword =await bcrypt.hash(password ,10);
            const user  = await new UserModel({
                email,
                password : hashedPassword
            });
            await user.save();
            
            return res.json({
                user
            })

        }
    } catch (error){
        return res.json({
            message : (error.keyValue.email || error.keyValue.password) + " already exists"
        })
       
        
    }
})

addUser.post("/login" , async (req , res)=>{
    const body = req.body;
    const {email , password} = body;
    try {
        const isDataValid = validateData(body);
        if(isDataValid){
            const userData = await UserModel.findOne({email});
            if(!userData){
                return res.json({
                    message : "User Not Found"
                })
            }
            const isPasswordCorrect = await bcrypt.compare( password , userData.password );
            if(!isPasswordCorrect){
                return res.json({
                    message : "Password is not correct"
                })
            }
            return res.json({
                userData
            })

            
        }
        
    } catch (error) {
        console.error(error)
        return res.json({
            message : error.message
        })
        
    }

})

export {
    addUser
}