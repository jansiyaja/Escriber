import OtpPage from "./assets/Pages/OtpPage";
import RegisterPage from "./assets/Pages/RegisterPage";
import LoginPage from "./assets/Pages/LoginPage";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/OTP-Verification" element={<OtpPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
