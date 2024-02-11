const BottomBar = ({ user }) => {
  return (
    <div className="bottom-bar flex justify-between items-center bg-stone-800 py-4 absolute bottom-0 w-full px-6 gap-4">
      {user && (
        <div className="flex justify-center items-center">
          <img
            src="https://randomuser.me/api/portraits"
            alt="Avatar"
            className="w-8 h-8 rounded-full"
          />
        </div>
      )}
      <div className="user-info flex flex-col justify-start ml-4">
        {user && (
          <>
            <div>Username</div>
            <div className="text-left">Online</div>
          </>
        )}
      </div>
      <div className="flex justify-center items-center">Friends</div>
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
