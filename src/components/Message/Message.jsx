import React, { useState, useEffect } from "react";

const Message = ({ chatroomid, messageid }) => {
  const [senderId, setSenderId] = useState(null);
  const [senderAvatar, setSenderAvatar] = useState(null);
  const [messageContent, setMessageContent] = useState(null);
  const [dateTime, setDateTime] = useState(null);
  const [sender, setSender] = useState(null);

  useEffect(() => {
    const fetchMessage = async () => {
      const entrypoint =
        import.meta.env.VITE_API_ENTRY_POINT +
        `/chatrooms/${chatroomid}/messages/${messageid}`;
      try {
        const response = await fetch(entrypoint);
        if (!response.ok) {
          throw new Error("Failed to fetch message");
        }
        const messageData = await response.json();
        setSenderId(messageData.message.sender);
        setMessageContent(messageData.message.message);
        setDateTime(messageData.message.formattedDateTime);
      } catch (error) {
        console.error("Error fetching message:", error);
      }
    };

    const fetchSender = async () => {
      if (!senderId) return;
      const entrypoint =
        import.meta.env.VITE_API_ENTRY_POINT + `/user/${senderId}`;
      try {
        const response = await fetch(entrypoint);
        if (!response.ok) {
          throw new Error("failed to fetch sender");
        }
        const senderData = await response.json();
        setSenderAvatar(senderData.user.avatar);
        setSender(senderData.user.username);
      } catch (error) {
        console.error("Error fetching sender:", error);
      }
    };

    fetchMessage();
    fetchSender();
  }, [chatroomid, messageid, senderId]);

  return (
    <div className="flex flex-col mb-4">
      <div className="bg-teal-200 rounded-lg p-2 mr-2 flex">
        <img
          src={"https://message-app-api.adaptable.app/" + senderAvatar}
          className="rounded-full border-stone-400 w-16 h-16 cursor-pointer mr-4"
          alt="Avatar"
        />
        <div className="flex flex-col justify-start">
          <div className="font-bold">{sender}</div>
          <div className="break-all">{messageContent}</div>
          <div className="text-xs text-gray-500">{dateTime}</div>
        </div>
      </div>
    </div>
  );
};

export default Message;
