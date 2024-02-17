import { useEffect, useState } from "react";
import Message from "../Message/Message";

const ChatWindow = ({ chatroom }) => {
  return (
    <div className="text-stone-900 text-xl underline underline-offset-4">
      <div>Chatroom</div>
    </div>
  );
};

export default ChatWindow;

/* 
      <div>{chatroom.name}</div>
      <div className="flex flex-col">
        {chatroom.map((chat, index) => (
          <div
            key={index}
            className="flex justify-center items-center text-gray-200 text-sm"
          >
            <Message message={message} />
          </div>
        ))}
      </div>

*/
