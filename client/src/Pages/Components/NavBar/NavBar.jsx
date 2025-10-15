import React from "react";
import "./NavBar.css";
import WomanIcon from "@mui/icons-material/Woman";
import { Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NavBar = ({ buttons = [] }) => {
  const navigate = useNavigate();

  return (
    <nav className="LandingNavbar">
      <div className="NavbarLogo">
        <WomanIcon fontSize="large" style={{ color: "#fff" }} />
        <span>Women Health & Wellness Portal</span>
      </div>

      <div className="NavbarLinks">
        {buttons.map((btn, idx) => (
          <Button
            key={idx}
            onClick={() => navigate(btn.path)}
            variant="contained"
            className="NavButton"
            startIcon={btn.icon ? React.createElement(btn.icon) : null}
            style={{ marginRight: "10px" }}
          >
            {btn.label}
          </Button>
        ))}
      </div>
    </nav>
  );
};

export default NavBar;
