// SideBar.jsx
import ChatBubble from "./ChatBubble.jsx";
import NewChatBubble from "./NewChatBubble.jsx";
import { useState, useEffect } from "react";

const SideBar = ({ handleOpenModal, setCurrentChatroom }) => {
  const [chatrooms, setChatrooms] = useState([]);
  const entrypoint = import.meta.env.VITE_API_ENTRY_POINT + "/chatrooms";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(entrypoint, {
          method: "GET",
        });

        if (response.ok) {
          const chatroomsData = await response.json();
          setChatrooms(chatroomsData.map((chatroom) => chatroom)); // Extract chatrooms
        } else {
          throw new Error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-gray-50 flex flex-col justify-center ">
      {chatrooms.map((room, index) => (
        <div
          key={index}
          className="flex justify-center items-center text-gray-200 text-sm"
        >
          <ChatBubble
            chatroom={room}
            setCurrentChatroom={setCurrentChatroom} // Correct prop name
          />
        </div>
      ))}
      <div>
        <NewChatBubble chatroom={"+"} handleClick={handleOpenModal} />
      </div>
    </div>
  );
};

export default SideBar;
