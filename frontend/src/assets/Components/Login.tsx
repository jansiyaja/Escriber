// src/assets/Pages/LoginPage.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../Components/Spinner";

const Login: React.FC = () => {
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
        
        localStorage.setItem("token", response.data.token);
        navigate('/dashboard'); 
      }
    } catch (error) {
      
      setError("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form  onSubmit={handleLogin}>
  
    <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
           Email
          </label>
          <input
            type="text"
            id="name"
            name="username"
            value={email}
             onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your name"
          />
          
        </div>
    

    <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
           password
          </label>
          <input
            type="text"
            id="name"
            name="username"
            value={password}
             onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your name"
          />
          
        </div>
   
    <button
      type="submit"
      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
      disabled={loading}
    >
      {loading ? <Spinner size="h-5 w-5" color="text-white"  text="verifying " /> : "Login"}
    </button>
    {error && <p className="text-red-500 mt-4">{error}</p>}
  </form>
  );
};

export default Login;
