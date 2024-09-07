
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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

    // Validation logic...

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateInputs()) return;
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:3000/users/register", register);
      if (response.status === 200) {
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
