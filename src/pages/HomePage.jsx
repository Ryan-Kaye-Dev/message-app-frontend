import React, { useState, useEffect } from "react";
import BottomBar from "../components/BottomBar/BottomBar";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/contexts/AuthContext";

const HomePage = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      // fetch user data
      // need to implement this on the backend through usercontroller
    }
  }, [isLoggedIn, navigate]);

  return <BottomBar user={user} />;
};

export default HomePage;
