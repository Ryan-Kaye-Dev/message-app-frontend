import React, { useState, useEffect, useRef } from "react";
import Message from "../Message/Message";

const ChatWindow = ({ chatroom }) => {
  const [messages, setMessages] = useState([]);
  const chatWindowRef = useRef(null);

  useEffect(() => {
    setMessages(chatroom.messages);
    // Scroll to the bottom of the chat window when messages are updated
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [chatroom.messages]);

  return (
    <div
      className="text-stone-900 text-xl overflow-y-auto"
      style={{ maxHeight: "750px", position: "relative" }}
    >
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          padding: "8px",
        }}
        className="bg-teal-300 rounded-md text-center py-2 my-2 font-bold"
      >
        {chatroom.name}
      </div>
      <div
        ref={chatWindowRef}
        className="flex flex-col justify-items-start h-full overflow-y-auto"
      >
        <div>
          {messages.length === 0 ? (
            <div>No Messages yet, be the first!</div>
          ) : (
            messages.map((messageId) => (
              <Message
                key={messageId}
                messageid={messageId}
                chatroomid={chatroom._id}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
