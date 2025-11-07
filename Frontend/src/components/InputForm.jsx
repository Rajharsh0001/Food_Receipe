import React, { useState } from "react";
import axios from "axios";

const InputForm = ({ setIsOpen }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState("");

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const endPoint = isSignUp ? "signup" : "login";
      const response = await axios.post(`http://localhost:5000/${endPoint}`, {
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      alert(
        isSignUp ? "Account Created Successfully" : "Logged In Successfully"
      );
      setIsOpen(false); // ✅ close modal
    } catch (err) {
      console.error("Frontend error:", err);
      setError(err.response?.data?.error || "Something went wrong!");
    }
  };

  return (
    <form className="form" onSubmit={handleOnSubmit}>
      <div className="form-control">
        <label>Email</label>
        <input
          type="email"
          className="input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="form-control">
        <label>Password</label>
        <input
          type="password"
          className="input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <button type="submit">{isSignUp ? "Sign Up" : "Login"}</button>

      {error && <h6 style={{ color: "red" }}>{error}</h6>}
      <br></br>

      <p
        onClick={() => setIsSignUp((prev) => !prev)}
        style={{ cursor: "pointer", color: "blue" }}
      >
        {isSignUp ? "Already have an account? Login" : "Create new account..."}
      </p>
    </form>
  );
};

export default InputForm;
