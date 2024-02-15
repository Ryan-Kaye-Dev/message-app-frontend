import Tooltip from "./Tooltip";
import { useState, useEffect } from "react";

const ChatBubble = ({ chatroom }) => {
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

  return (
    <div>
      {isHovering && (
        <Tooltip
          x={mousePosition.x}
          y={mousePosition.y + 15}
          label={chatroom}
        />
      )}

      <div
        className="text-teal-200 rounded-full border-stone-400 border-2 p-6 m-2 h-16 w-16 flex items-center justify-center bg-stone-700 hover:bg-stone-500 hover:border-teal-300 hover:border-2 cursor-pointer font-bold"
        onMouseEnter={() => handleHover(true)}
        onMouseLeave={() => handleHover(false)}
      >
        {chatroom[0]}
      </div>
    </div>
  );
};

export default ChatBubble;
