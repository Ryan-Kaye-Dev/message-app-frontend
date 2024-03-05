import React, { useState, useEffect } from "react";
import ChatBubble from "./ChatBubble.jsx";
import NewChatBubble from "./NewChatBubble.jsx";

const SideBar = ({ handleOpenModal, setCurrentChatroom }) => {
  const [chatrooms, setChatrooms] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showBubbles, setShowBubbles] = useState(false);

  const entrypoint = import.meta.env.VITE_API_ENTRY_POINT + "/chatrooms";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(entrypoint, {
          method: "GET",
        });

        if (response.ok) {
          const chatroomsData = await response.json();
          setChatrooms(chatroomsData.map((chatroom) => chatroom));
        } else {
          throw new Error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (isSidebarOpen) {
      setTimeout(() => {
        setShowBubbles(true);
      }, 50);
      setShowBubbles(false);
    }
  }, [isSidebarOpen]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div
      className={`bg-gray-50 flex flex-col justify-center transition-all duration-300 ${
        isSidebarOpen ? "w-16" : "w-0"
      }`}
    >
      {isSidebarOpen && showBubbles && (
        <>
          {chatrooms.map((room, index) => (
            <div
              key={index}
              className="flex justify-center items-center text-gray-200 text-sm"
            >
              <ChatBubble
                chatroom={room}
                setCurrentChatroom={setCurrentChatroom}
              />
            </div>
          ))}
          <div className="flex justify-center items-center text-gray-200 text-sm">
            {/* Ensure consistent positioning for NewChatBubble */}
            <NewChatBubble chatroom={"+"} handleClick={handleOpenModal} />
          </div>
        </>
      )}
      <button
        className="fixed top-2 right-2 bg-blue-500 text-white p-2 rounded-full"
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? "Hide" : "Show"} Chatrooms
      </button>
    </div>
  );
};

export default SideBar;
