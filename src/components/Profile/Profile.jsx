import React, { useState } from "react";
import { HashLoader } from "react-spinners";

const Profile = ({ user }) => {
  const [loading, setLoading] = useState(false);

  const handleFileUpload = async (e) => {
    setLoading(true);
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("avatar", file);

    const entrypoint = import.meta.env.VITE_API_ENTRY_POINT;
    try {
      const response = await fetch(`${entrypoint}/user/${user.userId}/upload`, {
        method: "POST",
        body: formData,
        // Add any headers if required, like authorization token
      });
      console.log(response);
      if (response.ok) {
        // File upload successful, update user avatar in UI or fetch updated user data
        // For example, you can reload the user data to reflect the new avatar
        console.log("File uploaded successfully");
      } else {
        // File upload failed, handle error
        console.error("File upload failed");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setLoading(false);
    }
  };

  // Check if user exists
  if (!user) {
    return (
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-50 px-10 py-4 rounded-lg shadow-xl text-gray-500 text-center">
        <div className="flex items-center justify-center">
          <HashLoader color={"#2dd4bf"} size={80} />
        </div>
      </div>
    );
  }

  // Define avatar URL
  const avatarUrl = import.meta.env.VITE_ENTRY_POINT + "/" + user.avatar;

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-100 text-slate-950 rounded-xl py-6 px-6 flex items-center max-w-screen-md mx-auto">
      <div className="mr-6 flex items-center flex-col">
        <img
          src={avatarUrl}
          alt="Profile Picture"
          className="w-48 h-48 object-cover rounded-full"
          style={{ maxWidth: "300px", maxHeight: "300px" }}
        />
        <label className="mt-4 px-4 py-2 bg-teal-600 text-gray-50 rounded-md hover:bg-teal-500 transition duration-300 ease-in-out cursor-pointer">
          {loading ? "Uploading..." : "Change Avatar"}
          <input
            type="file"
            className="hidden"
            onChange={handleFileUpload}
            disabled={loading}
          />
        </label>
      </div>
      <div>
        <div className="text-2xl font-bold mb-4">{user.username}</div>
        <div className="mb-4">
          <textarea
            className="w-full md:w-96 h-32 bg-stone-100 border-2 border-stone-500 rounded-xl p-2 resize-none"
            name="bio"
            id="bio"
            placeholder="Let your friends know a little bit about you!"
          ></textarea>
        </div>
        <div>
          <strong className="text-lg mb-2">Friends</strong>
          {user.friends.length > 0 ? (
            <ul>
              {user.friends.map((friend, index) => (
                <li key={index}>{friend.name}</li>
              ))}
            </ul>
          ) : (
            <div className="text-sm">You don't have any friends yet!</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
