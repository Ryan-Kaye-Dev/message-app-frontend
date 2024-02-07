import "../../src/stylesheets/SignupForm.css";

const SignupForm = () => {
  const handleSubmit = async (event) => {
    event.preventDefault();

    const entrypoint = import.meta.env.VITE_API_ENTRY_POINT + "signup";
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
      console.log({ "sending to": entrypoint });

      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);
      } else {
        throw new Error("Sign up failed");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="signup-form-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        {" "}
        {/* Attach onSubmit to form */}
        <h1>Sign Up</h1>
        <div>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Username"
            required
          />
        </div>
        <div>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="your@email.com"
            required
          />
        </div>
        <div>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            required
          />
        </div>
        <div>
          <input
            type="password"
            id="confirm-password"
            name="confirm-password"
            placeholder="Confirm password"
            required
          />
        </div>
        <div className="avatar-form">
          <button className="avatar-button" type="button">
            Upload Avatar
          </button>
        </div>
        <button className="signup-button" type="submit">
          {" "}
          {/* Remove onSubmit from button */}
          Sign Up
        </button>
        <div>
          Already have an account? <a href="/login">Log in</a>
        </div>
      </form>
    </div>
  );
};

export default SignupForm;
