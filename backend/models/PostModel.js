import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Types.ObjectId,
        ref : "User"

    },
    author : {
        type : String
    },
    content : {
        type : String,
        trim : true
    },
    createdAt : {
        type : Date,
        default : Date.now
    }

})

const PostModel = new mongoose.model("Post" , PostSchema);
export {
    PostModel
}