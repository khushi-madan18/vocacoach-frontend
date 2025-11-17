import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../utils/api";

const BACKEND = (import.meta.env.VITE_API_BASE || "http://localhost:4000/api").replace(/\/$/, "");

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const googleUrl = `${BACKEND}/auth/google`;

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      const res = await api.post("/auth/login", { email, password });
      const token = res?.data?.token;
      if (token) localStorage.setItem("token", token);
      navigate("/dashboard");
    } catch (err) {
      setError(err?.response?.data?.error || "Login failed");
    }
  }

  return (
    <div className="page-root">
      <div className="auth-top">
        <img src="/logo.svg" alt="VocaCoach logo" className="voca-logo" />
      </div>

      <main className="auth-main">
        <div className="card auth-card-lg">
          <h1 className="card-title">Welcome back</h1>
          <p className="card-sub">Enter your email and password to login</p>

          {error && <div className="alert-error">{error}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            <label className="label">
              <span className="label-text">Email</span>
              <input
                className="input"
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>

            <label className="label">
              <span className="label-text">Password</span>
              <input
                className="input"
                type="password"
                placeholder="enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>

            <button className="btn-primary" type="submit">Login</button>
          </form>

          <div className="divider">or</div>

          <a className="btn-google" href={googleUrl}>
            <svg aria-hidden viewBox="0 0 24 24" width="18" height="18" style={{marginRight:10}}>
              <path fill="#EA4335" d="M..."></path>
            </svg>
            Sign in with Google
          </a>

          <p className="muted">
            Don’t have an account? <Link to="/signup">Sign up</Link>
          </p>
        </div>
      </main>
    </div>
  );
}
