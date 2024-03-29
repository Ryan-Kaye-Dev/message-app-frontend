// ChatBubble.jsx
import React, { useState, useEffect } from "react";
import Tooltip from "./Tooltip";

const ChatBubble = ({ chatroom, setCurrentChatroom }) => {
  const [isHovering, setIsHovering] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleHover = (hovering) => {
    setIsHovering(hovering);
  };

  const handleMousePosition = (event) => {
    setMousePosition({ x: event.clientX, y: event.clientY });
  };

  useEffect(() => {
    if (isHovering) {
      window.addEventListener("mousemove", handleMousePosition);

      return () => {
        window.removeEventListener("mousemove", handleMousePosition);
      };
    }
  }, [isHovering]);

  const handleClick = () => {
    console.log("Clicked on chat bubble. Current chatroom:", chatroom);
    setCurrentChatroom(chatroom);
  };

  return (
    <div>
      {isHovering && (
        <Tooltip
          x={mousePosition.x}
          y={mousePosition.y + 15}
          label={chatroom.name}
        />
      )}

      <div
        className="bg-gray-800 rounded-full border border-gray-600 p-3 m-2 h-12 w-12 flex items-center justify-center cursor-pointer font-bold text-white hover:bg-gray-600"
        onMouseEnter={() => handleHover(true)}
        onMouseLeave={() => handleHover(false)}
        onClick={handleClick}
      >
        {chatroom.name ? chatroom.name[0] : "+"}
      </div>
    </div>
  );
};

export default ChatBubble;
