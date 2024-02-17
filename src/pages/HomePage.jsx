// HomePage.jsx
import React, { useState, useEffect } from "react";
import BottomBar from "../components/BottomBar/BottomBar";
import SideBar from "../components/SideBar/SideBar";
import ChatWindow from "../components/ChatWindow/ChatWindow";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/contexts/AuthContext";

const HomePage = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const [chatrooms, setChatrooms] = useState([
    "General",
    "Wellbeing",
    "Sport",
    "Gaming",
    "Web Dev",
    "Fitness",
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!isLoggedIn) {
          navigate("/login");
        } else {
          // Fetch user data
          const entrypoint = import.meta.env.VITE_API_ENTRY_POINT + "/user";
          const token = document.cookie
            .split("; ")
            .find((row) => row.startsWith("tokenCookie"))
            .split("=")[1];

          const response = await fetch(entrypoint, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${token}`,
            },
          });

          if (response.ok) {
            const userData = await response.json();
            setUser(userData);
          } else {
            throw new Error("User data fetch failed");
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [isLoggedIn, navigate]);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="bg-gray-50 opacity-90 z-10">
        {" "}
        {/* Ensure z-index here */}
        <SideBar chatrooms={chatrooms} />
      </div>

      {/* Main Content */}
      <div className="flex flex-col w-full relative z-0">
        {" "}
        {/* Ensure z-index here */}
        <div className="bg-gray-50 opacity-90 my-6 mx-4 p-2 h-full rounded-xl flex-grow">
          <ChatWindow />
        </div>
        <div className="w-full">
          <BottomBar user={user} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
