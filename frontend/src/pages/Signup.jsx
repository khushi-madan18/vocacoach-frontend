import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../utils/api";

const BACKEND = (import.meta.env.VITE_API_BASE || "http://localhost:4000/api").replace(/\/$/, "");

export default function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const googleUrl = `${BACKEND}/auth/google`;

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      await api.post("/auth/signup", { name, email, password });
      navigate("/login");
    } catch (err) {
      setError(err?.response?.data?.error || "Signup failed");
    }
  }

  return (
    <div className="page-root">
      <div className="auth-top">
        <img src="/logo.svg" alt="VocaCoach logo" className="voca-logo" />
      </div>

      <main className="auth-main">
        <div className="card auth-card-lg">
          <h1 className="card-title">Create your account</h1>
          <p className="card-sub">Enter your details to create an account</p>

          {error && <div className="alert-error">{error}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            <label className="label">
              <span className="label-text">Full name</span>
              <input
                className="input"
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </label>

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
                placeholder="create password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>

            <button className="btn-primary" type="submit">Create Account</button>
          </form>

          <div className="divider">or</div>

          <a className="btn-google" href={googleUrl}>
            <svg aria-hidden viewBox="0 0 24 24" width="18" height="18" style={{marginRight:10}}>
              <path fill="#EA4335" d="M..."></path>
            </svg>
            Continue with Google
          </a>

          <p className="muted">
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
        </div>
      </main>
    </div>
  );
}
