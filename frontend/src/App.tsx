import OtpPage from "./Pages/OtpPage";
import RegisterPage from "./Pages/RegisterPage";
import LoginPage from "./Pages/LoginPage";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from "./Pages/HomePage";
import ProtectedRoute from "./Components/ProtectedRout";


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/OTP-Verification" element={<OtpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<ProtectedRoute />}>
          <Route path="/" element={<HomePage />} />
          </Route>
         
         
        </Routes>
      </Router>
    </>
  );
}

export default App;
