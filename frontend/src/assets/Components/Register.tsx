import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Spinner from "../Components/Spinner"; // Adjust the path as necessary

export interface IRegister {
  username: string;
  password: string;
  email: string;
  confirmPassword: string;
}

export interface IErrorState {
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  generic?: string;
}

const Register: React.FC = () => {
  const [register, setRegister] = useState<IRegister>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Partial<IErrorState>>({});
  const [loading, setLoading] = useState(false); // Loading state

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    setRegister({
      ...register,
      [e.target.name]: e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  const validateInputs = () => {
    let tempErrors: Partial<IErrorState> = {};

    const usernameRegex = /^[A-Za-z]+$/;
    if (!register.username) {
      tempErrors.username = "Username is required";
    } else if (!usernameRegex.test(register.username)) {
      tempErrors.username = "Username must contain only letters";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!register.email) {
      tempErrors.email = "Email is required";
    } else if (!emailRegex.test(register.email)) {
      tempErrors.email = "Email is invalid";
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[a-zA-Z]).{6,}$/;
    if (!register.password) {
      tempErrors.password = "Password is required";
    } else if (!passwordRegex.test(register.password)) {
      tempErrors.password =
        "Password must be at least 6 characters, contain at least one uppercase letter, one number, and one special character";
    }

    if (!register.confirmPassword) {
      tempErrors.confirmPassword = "Confirm Password is required";
    } else if (register.password !== register.confirmPassword) {
      tempErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateInputs()) return;
  
    setLoading(true);
  
    try {
      const response = await axios.post('http://localhost:3000/users/register', register);
      if (response.status === 200) {
        
        localStorage.setItem("emailForVerification", register.email);
        navigate('/OTP-Verification');
      }
    } catch (error) {
      console.error("Registration error:", error);
      setErrors({ generic: "Registration failed. Please try again." });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <>
      <form onSubmit={handleRegister}>
      <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="username"
            value={register.username}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your name"
          />
           {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={register.email}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
           
          />
           {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={register.password}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password"
          />
           {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirm-password"
            name="confirmPassword"
            value={register.confirmPassword}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Confirm your password"
          />
           {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition duration-300 flex justify-center items-center"
          disabled={loading} 
        >
          {loading ? <Spinner size="h-5 w-5" color="text-white" text="Creating Account..." /> : "Create Account"}
        </button>

        {errors.generic && (
          <p className="text-red-500 text-sm mt-1 text-center">{errors.generic}</p>
        )}

        <div className="mt-6 text-center">
          <p className="mt-4 text-sm text-gray-600">
            Already have an account?{" "}
            <a href="/login" className="text-blue-600 hover:underline">
              Login
            </a>
          </p>
        </div>
      </form>
    </>
  );
};

export default Register;
