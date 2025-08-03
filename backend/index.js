import dotenv from "dotenv"
dotenv.config()
import express from "express"
import cors from "cors"
import { connectDB } from "./Database/DBConnection.js"
import { addUser } from "./routes/auth.js"
import { completeProfile } from "./routes/completeProfile.js"
import { post } from "./routes/post.js"
const app = express();

app.use(express.json())

app.use(cors({
    origin : "http://localhost:5173"
}))


app.use("/" , addUser);
app.use("/" , completeProfile)
app.use("/" , post);


connectDB()
.then(() => {
app.listen(3000, () => {
    console.log("Listening on port 3000");
});
})
.catch((error) => {
console.error("Failed to connect to database:", error);
});7
