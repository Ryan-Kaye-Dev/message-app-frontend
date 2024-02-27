import React, { useState, useEffect } from "react";
import BottomBar from "../components/BottomBar/BottomBar";
import SideBar from "../components/SideBar/SideBar";
import ChatWindow from "../components/ChatWindow/ChatWindow";
import NewChatModal from "../components/Modals/NewChatModal";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/contexts/AuthContext";

const HomePage = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [chatrooms, setChatrooms] = useState([]);
  const [currentChatroom, setCurrentChatroomState] = useState(null);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    console.log(currentChatroom);
    const fetchData = async () => {
      try {
        if (!isLoggedIn) {
          navigate("/login");
        } else {
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

    const fetchChatrooms = async () => {
      const entrypoint = import.meta.env.VITE_API_ENTRY_POINT + "/chatrooms";

      try {
        const response = await fetch(entrypoint, {
          method: "GET",
        });

        if (response.ok) {
          const chatroomsData = await response.json();
          setChatrooms(chatroomsData);
          const generalChatroom = chatroomsData.find(
            (room) => room.name === "General"
          );
          setCurrentChatroomState(generalChatroom);
          console.log("Current Chatroom:", generalChatroom);
        } else {
          throw new Error("Failed to fetch chatrooms");
        }
      } catch (error) {
        console.error("Error fetching chatrooms:", error);
      }
    };

    fetchData();
    fetchChatrooms();
  }, []); // Empty dependency array indicates that this effect should only run once

  return (
    <>
      <div className="flex h-screen">
        <div className="bg-gray-50 opacity-90 z-10">
          <SideBar
            chatrooms={chatrooms}
            currentChatroom={currentChatroom}
            setCurrentChatroom={setCurrentChatroomState}
            handleOpenModal={handleOpenModal}
          />
        </div>

        <div className="flex flex-col w-full relative z-0">
          <div className="bg-gray-50 opacity-90 my-6 mx-4 p-2 h-full rounded-xl flex-grow">
            {currentChatroom && <ChatWindow chatroom={currentChatroom} />}
          </div>
          <div className="w-full">
            <BottomBar user={user} chatroom={currentChatroom} />
          </div>
        </div>
      </div>
      {isOpen && <NewChatModal isOpen={isOpen} onClose={handleCloseModal} />}
    </>
  );
};

export default HomePage;
