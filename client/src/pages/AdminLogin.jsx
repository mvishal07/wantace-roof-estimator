import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { loginAdmin } from "../api/authApi";

const AdminLogin = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    try {
      setLoading(true);

      const response = await loginAdmin({
        email,
        password,
      });

      localStorage.setItem(
        "adminToken",
        response.data.token
      );

      localStorage.setItem(
        "admin",
        JSON.stringify(response.data.admin)
      );

      navigate("/admin/dashboard");
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
          "Login failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page">
      <form
        className="admin-login-card"
        onSubmit={handleSubmit}
      >
        <h1>Admin Login</h1>

        <p>
          Northline Roofing & Exteriors
        </p>

        <label>Email</label>

        <input
          type="email"
          value={email}
          onChange={(event) =>
            setEmail(event.target.value)
          }
          placeholder="admin@example.com"
        />

        <label>Password</label>

        <input
          type="password"
          value={password}
          onChange={(event) =>
            setPassword(event.target.value)
          }
          placeholder="Password"
        />

        {error && (
          <p className="error">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
        >
          {loading
            ? "Signing in..."
            : "Sign In"}
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;