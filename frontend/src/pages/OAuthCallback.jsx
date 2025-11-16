import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { setAuthToken } from "../utils/api";

export default function OAuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const url = new URLSearchParams(window.location.search);
    const token = url.get("token");

    if (token) {
      localStorage.setItem("token", token);
      setAuthToken(token);
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <div className="auth-container">
      <h2 className="auth-title">Finishing Sign-in...</h2>
    </div>
  );
}
