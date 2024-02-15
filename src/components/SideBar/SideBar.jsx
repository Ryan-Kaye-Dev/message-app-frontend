// SideBar.jsx
import ChatBubble from "./ChatBubble.jsx";

const SideBar = ({ chatrooms }) => {
  return (
    <div className="bg-stone-800 flex flex-row justify-center">
      {chatrooms.map((chatroom, index) => (
        <div
          key={index}
          className="flex justify-center items-center text-gray-200 text-sm"
        >
          <ChatBubble chatroom={chatroom} />
        </div>
      ))}
    </div>
  );
};

export default SideBar;
