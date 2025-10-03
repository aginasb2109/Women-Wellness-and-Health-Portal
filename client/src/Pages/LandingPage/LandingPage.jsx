import React from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";
import WomanIcon from '@mui/icons-material/Woman';
import Button from '@mui/material/Button';
import Footer from "../Components/Footer/Footer";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="LandingContainer">
    
      <nav className="LandingNavbar">
        <div className="NavbarLogo">
          <WomanIcon fontSize="large" style={{ color: '#fff' }} />
          <span>Women Health & Wellness Portal</span>
        </div>
        <div className="NavbarLinks">
          <Button onClick={() => navigate("/login")} variant="contained" className="NavButton">
            Login
          </Button>
          <Button onClick={() => navigate("/register")} variant="contained" className="NavButton">
            Register
          </Button>
        </div>
      </nav>


      <div className="LandingContent">
        <h1>Welcome to the Women Health & Wellness Portal</h1>
        <p>Your one-stop solution for health, fitness, and wellness.</p>
        <div className="LandingButtons">
          <Button onClick={() => navigate("/login")} variant="contained" className="LandingButton"
          sx={{background: "linear-gradient(90deg, #d81b60, #8e24aa)"}} >
            Get Started
          </Button>
        </div>
      </div>

   
      <Footer />
    </div>
  );
};

export default LandingPage;
