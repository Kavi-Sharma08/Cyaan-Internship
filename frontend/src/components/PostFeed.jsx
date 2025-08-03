import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../Contexts/UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SignupPage from "../pages/SignupPage";

const PostFeed = () => {
  const { user, token } = useContext(UserContext);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/getAllPost`);
      setPosts(response.data);
    } catch (err) {
      console.error("Failed to load posts:", err);
      setError("Failed to load posts.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#191724] to-[#24243e] text-gray-100 px-4 py-6">
      <h1 className="text-3xl font-extrabold mb-6 text-center">Public Post Feed</h1>

      {loading ? (
        <p className="text-center text-gray-400">Loading posts...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : posts.length === 0 ? (
        <p className="text-center text-gray-400">No posts yet.</p>
      ) : (
        <ul className="max-w-full mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {posts.map(({ _id, content, author, createdAt }) => (
            <li
              key={_id}
              className="
                bg-[#232136]/95 shadow-xl rounded-2xl p-6 border border-[#393552] break-words
              "
            >
              <p className="mb-3 text-gray-200">{content}</p>
              <div className="flex justify-between text-sm text-gray-400">
                <span className="font-semibold text-[#b4637a]">
                  {"by " + (author || "Unknown Author")}
                </span>
                <span>{new Date(createdAt).toLocaleString()}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
      <button
        onClick={() => user? navigate("/create-post") : navigate("/signup")}
        className="
          fixed bottom-16 right-8 z-50
          bg-blue-600 hover:bg-blue-700 active:bg-blue-800
          shadow-lg shadow-blue-600/70 rounded-full p-5
          text-white text-2xl font-bold
          transition
          focus:outline-none focus:ring-4 focus:ring-blue-500/80
          hover:scale-110
          active:scale-95
        "
        aria-label="Create Post"
        title="Create a new post"
      >
        +
      </button>
    </div>
  );
};

export default PostFeed;
