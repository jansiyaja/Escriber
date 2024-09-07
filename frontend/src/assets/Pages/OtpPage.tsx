import { useState ,} from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "../Components/Spinner";
import axios from 'axios'

const OtpPage = () => {
  const [otp, setOtp] = useState(Array(4).fill(""));
  
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number): void => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value && index < otp.length - 1) {
        (document.getElementById(`otp-input-${index + 1}`) as HTMLInputElement).focus();
      }
    }
  };

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
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-bl from-blue-500 via-blue-950 via-50% to-blue-500 ">
      <div className="bg-white p-10 rounded-lg shadow-xl w-100">
        <h2 className="text-3xl font-bold text-center mb-4 font-bodoni">Verify OTP</h2>
        <p className="text-xl font-bodoni font-semibold p-3 text-gray-700">Enter your OTP Number</p>
        <form className="flex flex-col items-center" onSubmit={handleVerifyOtp}>
          <div className="flex space-x-2">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-input-${index}`}
                value={digit}
                onChange={(e) => handleChange(e, index)}
                className="w-10 h-10 border border-gray-300 rounded-md text-center text-xl"
                maxLength={1}
              />
            ))}
          </div>

          <button
            type="submit"
            className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition flex items-center justify-center"
            disabled={loading}
          >
            {loading ? <Spinner size="h-5 w-5" color="text-white"  text="verifying OTP ...." /> : "submit"}
          </button>

          <p className="font-bodoni text-sm text-gray-500 pt-5">
            Didn’t get an OTP? <span className="text-blue-600 hover:underline">Resend It</span>
          
          </p>
          {error && <p>{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default OtpPage;
