import React, { useState } from "react";
import "../../stylesheets/SignupForm.css";
import { useNavigate } from "react-router-dom";
import { HashLoader } from "react-spinners";

const SignupForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const entrypoint = import.meta.env.VITE_API_ENTRY_POINT + "/signup";
    try {
      const response = await fetch(entrypoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: event.target.username.value,
          email: event.target.email.value,
          password: event.target.password.value,
        }),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);
        navigate("/login"); // Programmatically navigate to login page
      } else {
        throw new Error("Sign up failed");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col bg-gray-100 px-10 rounded-lg shadow-xl text-gray-500">
      {loading ? (
        <div className="flex items-center justify-center py-5">
          <HashLoader color={"#2dd4bf"} loading={loading} size={80} />
        </div>
      ) : (
        <form className="p-4" onSubmit={handleSubmit}>
          {" "}
          <h1 className="p-4 text-teal-500 ">Sign Up</h1>
          <div>
            <input
              style={{
                backgroundImage: "url(../../../src/assets/user.png)",
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
          <div>
            <input
              style={{
                backgroundImage: "url(../../../src/assets/envelope.png)",
                backgroundSize: "20px",
                backgroundPosition: "5px 6px",
                backgroundRepeat: "no-repeat",
                paddingLeft: "30px",
                filter: "invert(0.45)",
              }}
              type="email"
              id="email"
              name="email"
              placeholder="your@email.com"
              required
              className="w-full p-1 my-2 bg-transparent border border-gray-300 rounded-md text-gray-500"
            />
          </div>
          <div>
            <input
              style={{
                backgroundImage: "url(../../../src/assets/locked-computer.png)",
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
          <div>
            <input
              style={{
                backgroundImage: "url(../../../src/assets/locked-computer.png)",
                backgroundSize: "20px",
                backgroundPosition: "5px 5px",
                backgroundRepeat: "no-repeat",
                paddingLeft: "30px",
                filter: "invert(0.45)",
              }}
              type="password"
              id="confirm-password"
              name="confirm-password"
              placeholder="Confirm password"
              required
              className="w-full p-1 my-2 bg-transparent border border-gray-300 rounded-md text-gray-500"
            />
          </div>
          <button
            className="w-full bg-teal-600 text-gray-50 py-1 rounded-md my-2 hover:bg-teal-500 hover:border-gray-400 transition duration-300 ease-in-out"
            type="submit"
          >
            {" "}
            Sign Up
          </button>
          <div className="my-2">
            Already have an account? <a href="/login">Log in</a>
          </div>
        </form>
      )}
    </div>
  );
};

export default SignupForm;
