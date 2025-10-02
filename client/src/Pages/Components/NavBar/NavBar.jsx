import React from 'react';
import "./NavBar.css";
import WomanIcon from '@mui/icons-material/Woman';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const NavBar = () => {

    const navigate= useNavigate();
  return (
     <nav className="LandingNavbar">
        <div className="NavbarLogo">
          <WomanIcon fontSize="large" style={{ color: '#fff' }} />
          <span>Women Health & Wellness Portal</span>
        </div>
        <div className="NavbarLinks">
          <Button onClick={() => navigate("/dashboard")} variant="contained" className="NavButton">
            Dashboard
          </Button>
          
        </div>
      </nav>
  )
}

export default NavBar