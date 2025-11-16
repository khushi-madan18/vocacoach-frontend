import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user, logout } = useAuth();

  if (!user) return <div className="auth-container">Loading...</div>;

  return (
    <div className="auth-container">
      <h2 className="auth-title">Dashboard</h2>
      <p>Hello, {user.name || user.email}</p>

      <button className="auth-btn" onClick={logout}>
        Logout
      </button>
    </div>
  );
}
