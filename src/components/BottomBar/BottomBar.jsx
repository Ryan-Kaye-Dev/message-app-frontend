const BottomBar = ({ user }) => {
  if (!user) {
    return <div>Loading...</div>;
  }

  // Construct the full URL to the user's avatar
  const avatarUrl = import.meta.env.VITE_ENTRY_POINT + user.avatar;

  return (
    <div className="bottom-bar flex justify-between items-center bg-stone-800 py-4 absolute bottom-0 w-full px-6 gap-4 z-10">
      <div className="justify-center items-center w-16 h-16">
        <img
          src={avatarUrl}
          alt="Avatar"
          className="rounded-full border-stone-400 w-16 h-16 cursor-pointer"
        />
      </div>
      <div className="user-info flex flex-col justify-start ml-4">
        <>
          <div className="text-left text-lg">{user.username}</div>
          <div className="text-left text-sm text-green-300">Online</div>{" "}
        </>
      </div>
      <div className="flex justify-center items-center ml-2 p-1">
        <img
          className="h-6 cursor-pointer"
          src="../../../src/assets/friends.png"
          alt="friends"
        />
      </div>
      <div className="flex flex-grow justify-center items-center">
        <input
          type="text"
          className="w-full pl-3 py-2 bg-stone-700 rounded-md border border-stone-600 text-stone-300 focus:outline-none focus:border-stone-500 transition duration-300 ease-in-out"
          placeholder="Enter your message..."
        />
      </div>
    </div>
  );
};

export default BottomBar;
