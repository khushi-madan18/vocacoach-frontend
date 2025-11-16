import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (error) {
      setErr(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="auth-container">
      <h2 className="auth-title">Welcome Back</h2>

      <form onSubmit={onSubmit}>
        {err && <p className="error">{err}</p>}

        <input
          className="auth-input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="auth-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="auth-btn">Login</button>
      </form>

      <a
        href={`${import.meta.env.VITE_API_BASE || "http://localhost:4000/api"}/auth/google`}
      >
        <button className="google-btn">Continue with Google</button>
      </a>

      <p className="text-center">
        Don't have an account? <Link to="/signup">Create account</Link>
      </p>
    </div>
  );
}
