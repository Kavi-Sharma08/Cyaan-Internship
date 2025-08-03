import express from "express"
import { PostModel } from "../models/PostModel.js";
const post = express.Router();


post.post("/create-post" , async (req , res)=>{
    const body = req.body;

    const {content , author , id} = body;
    const postCreated = new PostModel({
        userId : id,
        content,
        author
    })
    await postCreated.save();

    return res.json({
        postCreated
    })
})

post.get('/getAllPost', async (req, res) => {
  try {
    // Fetch all posts, sort by creation date (newest first)
    // Populate the author field with name and any other safe info
    const posts = await PostModel.find()
      .sort({ createdAt: -1 })
      .populate('author', 'name email') // populate author, selecting name and email
      .exec();

    res.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

post.get("/getPostOfAdmin", async (req, res) => {
  try {
    const adminId = req.query.id;
    if (!adminId) {
      return res.status(400).json({ error: "Admin id (query param id) required" });
    }
    const allPosts = await PostModel.find({ userId: adminId }).sort({ createdAt: -1 });

    return res.json({ posts: allPosts });
  } catch (error) {
    console.error("Error fetching admin posts:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

export {
    post
}
