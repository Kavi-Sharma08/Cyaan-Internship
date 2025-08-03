import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../Contexts/UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const { user } = useContext(UserContext);
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [posts, setPosts] = useState([]);
  const [postsLoading, setPostsLoading] = useState(false);
  const [postsError, setPostsError] = useState("");

  const navigate = useNavigate();

  // Fetch posts created by this admin (user) on component mount / user change
  useEffect(() => {
    if (!user?._id) return; // wait until user info is available

    const fetchAdminPosts = async () => {
      setPostsLoading(true);
      setPostsError("");
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/getPostOfAdmin?id=${user._id}`
        );
        // Assuming your backend returns posts array in response.data.posts
        setPosts(response.data.posts || []);
      } catch (err) {
        setPostsError("Failed to load posts.");
        console.error(err);
      } finally {
        setPostsLoading(false);
      }
    };

    fetchAdminPosts();
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!content.trim()) return;

    try {
      setLoading(true);
      const postData = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/create-post`,
        { content, author: user.name, id: user._id }
      );
      setLoading(false);
      setContent("");

      // Optionally refresh the posts list or add new post to posts state:
      setPosts((prev) => [postData.data.post || postData.data, ...prev]);

      navigate("/all-post"); // Or remove to stay on page and see updated posts
    } catch (err) {
      setLoading(false);
      setError("Failed to create post. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#191724] to-[#24243e] text-gray-100 px-6 py-12 flex flex-col items-center">
      <div
        className="
          max-w-3xl w-full
          bg-[#232136]/95 rounded-2xl
          shadow-2xl border border-[#393552]
          p-8 mb-10
          flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6
        "
      >
        <div>
          <h2 className="text-2xl font-bold text-[#e0def4]">{user?.name || "No Name"}</h2>
          <p className="text-sm text-gray-400">{user?.email || "No Email"}</p>
        </div>
        <p className="max-w-lg text-gray-300 italic">{user?.bio || "No bio provided."}</p>
      </div>
      <form
        onSubmit={handleSubmit}
        className="max-w-3xl w-full flex flex-col"
        aria-label="Create a new post"
      >
        <textarea
          className="
            w-full min-h-[180px] p-5 rounded-2xl
            bg-[#1f1d2b] border border-[#393552] text-gray-100 placeholder-gray-400
            focus:outline-none focus:ring-2 focus:ring-[#b4637a]/60 resize-none
            transition
            shadow-md
          "
          placeholder="What's on your mind?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          disabled={loading}
          spellCheck={false}
          aria-required="true"
        />

        <button
          type="submit"
          disabled={!content.trim() || loading}
          className={`
            mt-6 py-4 rounded-xl font-semibold text-lg shadow-lg uppercase tracking-wide
            transition-all duration-200 focus:ring-2 focus:ring-[#2563eb]/60 active:scale-95
            ${content.trim() && !loading
              ? "bg-gradient-to-tr from-[#2563eb] via-[#1e3a8a] to-[#0ea5e9] hover:from-[#1e40af] hover:to-[#38bdf8] cursor-pointer"
              : "bg-gray-600 text-gray-400 cursor-not-allowed"
            }
          `}
        >
          {loading ? "Posting..." : "Post"}
        </button>

        {error && (
          <p className="mt-4 text-red-500 text-center select-none" role="alert">
            {error}
          </p>
        )}
      </form>
      <div className="max-w-3xl w-full mt-12">
        <h3 className="text-xl font-bold mb-4">Posts by You</h3>
        {postsLoading && <p>Loading posts...</p>}
        {postsError && <p className="text-red-500">{postsError}</p>}

        {!postsLoading && posts.length === 0 && (
          <p className="text-gray-400 italic">No posts found.</p>
        )}

        <ul className="space-y-4">
          {posts.map(({ _id, content, createdAt }) => (
            <li
              key={_id}
              className="bg-[#1f1d2b] p-4 rounded-lg border border-[#393552] shadow-md"
            >
              <p className="text-gray-200 mb-2 whitespace-pre-wrap">{content}</p>
              <small className="text-gray-400 block">
                Posted on: {new Date(createdAt).toLocaleString()}
              </small>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CreatePost;
