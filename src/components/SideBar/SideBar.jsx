// SideBar.jsx
import ChatBubble from "./ChatBubble.jsx";

const SideBar = ({ chatrooms }) => {
  return (
    <div className="flex flex-col justify-start items-center bg-stone-800 absolute left-0 h-full w-1/12">
      {chatrooms.map((chatroom, index) => (
        <ChatBubble key={index} chatroom={chatroom} />
      ))}
    </div>
  );
};

export default SideBar;
