import Tooltip from "../SideBar/Tooltip";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const BottomBar = ({ user }) => {
  const navigate = useNavigate();
  const [isHovering, setIsHovering] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredItem, setHoveredItem] = useState(null);

  const handleHover = (hovering, item) => {
    setIsHovering(hovering);
    setHoveredItem(item);
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

  if (!user) {
    return <div>Loading...</div>;
  }

  const avatarUrl = import.meta.env.VITE_ENTRY_POINT + user.avatar;

  return (
    <div>
      {isHovering && (
        <Tooltip
          x={mousePosition.x}
          y={mousePosition.y + 15}
          label={hoveredItem === "profile" ? "Profile" : "Friends"}
        />
      )}
      <div className="bottom-bar flex justify-between items-center bg-gray-50 py-4 w-full px-6 gap-4 z-10 text-slate-950 opacity-90">
        <div
          className="justify-center items-center w-16 h-16"
          onMouseEnter={() => handleHover(true, "profile")}
          onMouseLeave={() => handleHover(false, "profile")}
        >
          <img
            src={avatarUrl}
            alt="Avatar"
            className="rounded-full border-stone-400 w-16 h-16 cursor-pointer"
            onClick={() => navigate("/profile")}
          />
        </div>
        <div className="user-info flex flex-col justify-start ml-4">
          <>
            <div className="text-left text-lg">{user.username}</div>
            <div className="text-left text-sm text-green-600">Online</div>{" "}
          </>
        </div>
        <div
          className="flex justify-center items-center ml-2 p-1"
          onMouseEnter={() => handleHover(true, "friends")}
          onMouseLeave={() => handleHover(false, "friends")}
          onClick={() => navigate("/friends")}
        >
          <img
            className="h-6 cursor-pointer"
            src="../../../src/assets/friends.png"
            alt="friends"
          />
        </div>
        <div className="flex flex-grow items-center">
          <input
            type="text"
            className="flex-1 pl-3 py-2 bg-transparent rounded-md border border-stone-600 text-stone-800 focus:outline-none focus:border-stone-500 transition duration-300 ease-in-out"
            placeholder="Enter your message..."
          />
          <button
            className="ml-2 px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-500 transition duration-300 ease-in-out"
            type="button"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default BottomBar;
