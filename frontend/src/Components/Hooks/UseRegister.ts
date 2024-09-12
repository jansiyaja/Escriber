
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { IRegister,IErrorState } from "../../Interfaces/Auth";


const useRegister = () => {
  const [register, setRegister] = useState<IRegister>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Partial<IErrorState>>({});
  const [loading, setLoading] = useState(false);
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
      const response = await axios.post("http://localhost:3000/users/register", register);
      if (response.status === 201) {
        localStorage.setItem("emailForVerification", register.email);
        navigate("/OTP-Verification");
      }
    } catch (error) {
      setErrors({ generic: "Registration failed. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return {
    register,
    errors,
    loading,
    handleChange,
    handleRegister,
  };
};

export default useRegister;
