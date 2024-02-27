import React, { useRef, useEffect } from "react";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "400px",
  padding: "16px",
};

const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  backgroundColor: "rgba(0, 0, 0, 0.75)", // Dark semi-transparent background
};

const NewChatModal = ({ isOpen, onClose }) => {
  const modalRef = useRef();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const entrypoint =
      import.meta.env.VITE_API_ENTRY_POINT + "/chatrooms/create";
    try {
      const response = await fetch(entrypoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: event.target.name.value,
        }),
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    isOpen && (
      <>
        <div style={overlayStyle}></div>
        <div
          style={modalStyle}
          ref={modalRef}
          className="text-teal-500 font-bold bg-gray-50 rounded-lg"
        >
          <div className="text-xl">New Chat</div>
          <div>
            <select name="friend" id="friend">
              <option value="friend1">Friend 1</option>
              <option value="friend2">Friend 2</option>
            </select>
          </div>
          <div className="pt-4 text-xl">New Chatroom *Admins Only*</div>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter Chatroom Name..."
              className="w-full p-1 my-2 bg-transparent border border-gray-300 rounded-md text-gray-900 text-md pl-2"
            />
            <button
              type="submit"
              className="w-full bg-teal-600 text-gray-50 py-1 rounded-md my-2 hover:bg-teal-500 hover:border-gray-400 transition duration-300 ease-in-out"
            >
              Create
            </button>
          </form>
        </div>
      </>
    )
  );
};

export default NewChatModal;
