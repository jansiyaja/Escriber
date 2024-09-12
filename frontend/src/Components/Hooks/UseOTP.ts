
import { useState ,} from "react";
import { useNavigate } from "react-router-dom";

import axios from 'axios'

const UseOTP = () => {
 const [otp, setOtp] = useState(Array(4).fill(""));
  
const [error, setError] = useState("");
const [loading, setLoading] = useState(false);
const navigate = useNavigate();

   


      const handleVerifyOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        
        const email = localStorage.getItem("emailForVerification");
        
        if (!email) {
          setError("No email found. Please register again.");
          setLoading(false);
          return;
        }
        
        try {
          
          
          const response = await axios.post('http://localhost:3000/users/verify-otp', { otp:otp.join(""), email: email });
        
         
          
          if (response.status === 200) {
            localStorage.removeItem("emailForVerification");
            navigate('/login'); 
          }
        } catch (error) {
          console.error("OTP Verification error:", error);
          setError("Invalid OTP. Please try again.");
        } finally {
          setLoading(false);
        }
      }
    
  return {
error,
loading,
otp,
setOtp,
handleVerifyOtp
  }
  
  
}

export default UseOTP
