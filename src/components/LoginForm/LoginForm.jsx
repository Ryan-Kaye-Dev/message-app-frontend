// LoginForm.jsx
import React, { useState } from "react";
import "../../stylesheets/SignupForm.css";
import { useNavigate, Link } from "react-router-dom";
import { HashLoader } from "react-spinners";
import { useAuth } from "../contexts/AuthContext";
import UserIcon from "../../../src/assets/user.png";
import PasswordIcon from "../../../src/assets/locked-computer.png";

const LoginForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const entrypoint = import.meta.env.VITE_API_ENTRY_POINT + "/login";
    try {
      const response = await fetch(entrypoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: event.target.username.value,
          password: event.target.password.value,
        }),
      });

      if (response.ok) {
        const responseData = await response.json();

        // Handle authentication token
        const token = responseData.token;

        // Store the token securely, for example, in an HTTP-only cookie
        document.cookie = `tokenCookie=${token}; path=/; SameSite=Strict`;

        console.log("Login successful. Token:", token);
        console.log("Cookie:", document.cookie);

        // Update the login state
        login();

        navigate("/"); // Programmatically navigate to login page
      } else {
        throw new Error("Login failed");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-100 px-10 rounded-lg shadow-xl text-gray-500 text-center">
      {loading ? (
        <div className="flex items-center justify-center py-5">
          <HashLoader color={"#2dd4bf"} loading={loading} size={80} />
        </div>
      ) : (
        <form className="p-4" onSubmit={handleSubmit}>
          {" "}
          <h1 className="p-4 text-teal-500 ">Welcome Back!</h1>
          <div className="w-full">
            <input
              style={{
                backgroundImage: `url(${UserIcon})`,
                backgroundSize: "20px",
                backgroundPosition: "5px 5px",
                backgroundRepeat: "no-repeat",
                paddingLeft: "30px",
                filter: "invert(0.45)",
              }}
              type="text"
              id="username"
              name="username"
              placeholder="Username"
              required
              className="w-full p-1 my-2 bg-transparent border border-gray-300 rounded-md text-gray-500"
            />
          </div>{" "}
          <div className="w-full">
            <input
              style={{
                backgroundImage: `url(${PasswordIcon})`,
                backgroundSize: "20px",
                backgroundPosition: "5px 5px",
                backgroundRepeat: "no-repeat",
                paddingLeft: "30px",
                filter: "invert(0.45)",
              }}
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              required
              className="w-full p-1 my-2 bg-transparent border border-gray-300 rounded-md text-gray-500"
            />
          </div>
          <button
            className="w-full bg-teal-600 text-gray-50 py-1 rounded-md my-2 hover:bg-teal-500 hover:border-gray-400 transition duration-300 ease-in-out"
            type="submit"
          >
            {" "}
            Log In
          </button>
          <div className="my-2 mx-4">
            Don't have an account yet? <Link to="/signup">Create Account</Link>
          </div>
        </form>
      )}
    </div>
  );
};

export default LoginForm;
