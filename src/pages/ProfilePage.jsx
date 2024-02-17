import Profile from "../components/Profile/Profile.jsx";
import { useState, useEffect } from "react";
import { useAuth } from "../components/contexts/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!isLoggedIn) {
          navigate("/login");
        } else {
          // Fetch user data
          const entrypoint = import.meta.env.VITE_API_ENTRY_POINT + "/user";
          const token = document.cookie
            .split("; ")
            .find((row) => row.startsWith("tokenCookie"))
            .split("=")[1];

          const response = await fetch(entrypoint, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${token}`,
            },
          });

          if (response.ok) {
            const userData = await response.json();
            setUser(userData);
          } else {
            throw new Error("User data fetch failed");
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [isLoggedIn, navigate]);

  return (
    <>
      <Profile user={user} />
    </>
  );
};

export default ProfilePage;
