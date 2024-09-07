// src/assets/Pages/LoginPage.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../Components/Spinner"; // Adjust the path as necessary

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:3000/users/login', { email, password });
      if (response.status === 200) {
        // Assuming the backend returns a token
        localStorage.setItem("token", response.data.token);
        navigate('/dashboard'); // Redirect to a protected route, e.g., dashboard
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-bl from-blue-500 via-blue-950 via-50% to-blue-500 ">
      <div className="bg-white p-10 rounded-lg shadow-xl w-100">
        <h2 className="text-3xl font-bold text-center mb-4 font-bodoni">Login</h2>
        <form className="flex flex-col items-center" onSubmit={handleLogin}>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            disabled={loading}
          >
            {loading ? <Spinner size="h-5 w-5" color="text-white" /> : "Login"}
          </button>
          {error && <p className="text-red-500 mt-4">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
