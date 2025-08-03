import express from "express"
import { UserModel } from "../models/UserModel.js";
const completeProfile = express.Router();

completeProfile.post("/completeProfile" , async (req , res)=>{
    const body = req.body;
    const {email , name , bio} = body;

    const userData = await UserModel.findOne({email});
    if(!userData){
        return res.json({
            message : "User no found"
        })
    }
    userData.name = name;
    userData.bio = bio;

    await userData.save();
    return res.json({
        userData
    })
})

completeProfile.get("/getProfile" , async (req , res)=>{
    const id = req.query.id
    const user = await UserModel.findOne({_id : id});

    if(!user){
        return res.json({
            message : "User not Found"
        })
    }

    if(!user.name || !user.bio || !user.email){
        return res.json({
            message : "Complete your Profile"
        })
    }
    return res.json({
        message : "Profile is completed"
    })
})

export {
    completeProfile
}