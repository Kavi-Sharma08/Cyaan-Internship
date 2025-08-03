import mongoose, { mongo } from "mongoose";
const UserSchema = new mongoose.Schema({
    email : {
        type : String,
        required : [true , "Email is required"],
        unique : true
    },
    password : {
        type : String,
        required : [true , "password is required"],
    },
    name : {
        type : String
    },
    bio : {
        type : String
    }
},{
    timestamps : true
})


const UserModel = new mongoose.model("User" , UserSchema);

export {
    UserModel
}