import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../Contexts/UserContext";
import Input from "../components/Input"; // Your reusable Input component
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  // Local form state to edit name, email, and bio
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");

  // Initialize local state with user data on mount / when user changes
  useEffect(() => {
    if (user) {
      setName(user.name || "Kavi");
      setEmail(user.email || "");
      setBio(user.bio || "Hello i am a coder");
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // You can send updated data to your backend here, then update context
    const {email} = user;
    const ProfileOfUser = {email , name, bio };
    const userProfileData = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/completeProfile` , ProfileOfUser);
    const userData = userProfileData?.data?.userData;
    setUser(userData);
    return navigate("/all-post")
    


  };

  if (!user) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-[#191724] to-[#24243e] px-4 py-10">
        <p className="text-gray-300 text-lg">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-[#191724] to-[#24243e] px-4 py-10">
      <div
        className="
          bg-[#232136]/95
          rounded-2xl
          shadow-2xl
          border border-[#393552]
          max-w-md w-full p-10
        "
      >
        <h1 className="text-3xl font-extrabold text-center mb-8 text-[#e0def4]">
          Complete Your Profile
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Name"
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-[#1f1d2b] border-[#393552] text-gray-100 placeholder-gray-400 focus:ring-[#b4637a]/60"
          />
          <Input
            label="Email"
            type="email"
            placeholder="Enter your email"
            value={email}
            disabled
            onChange={(e) => setEmail(e.target.value)}
            className="bg-[#1f1d2b] border-[#393552] text-gray-100 placeholder-gray-400 focus:ring-[#b4637a]/60"
          />
          <div>
            <label className="block mb-2 text-sm font-medium text-[#e0def4]">
              Bio
            </label>
            <textarea
              className="
                w-full p-3 border border-[#393552] rounded-lg 
                bg-[#1f1d2b] text-gray-100 
                focus:outline-none focus:ring-2 focus:ring-[#b4637a]/60 resize-none
              "
              rows={4}
              placeholder="Tell us about yourself"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="
              w-full py-3 
              bg-blue-700
              text-white text-lg rounded-xl font-semibold shadow-md
              transition-all duration-200
              focus:ring-2 focus:ring-[#2563eb]/60
              active:scale-95
            "
          >
            Save Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
