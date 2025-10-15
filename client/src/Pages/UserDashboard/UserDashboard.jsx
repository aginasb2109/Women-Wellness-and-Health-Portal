import React from "react";
import { useNavigate } from "react-router-dom";
import "./UserDashboard.css";
import WomanIcon from '@mui/icons-material/Woman';
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ServiceColumn from "../Components/ServiceColumn/ServiceColumn";
import SafetyTipColumn from "../Components/SafetyTipColumn/SafetyTipColumn";
import RecentNews from "../Components/RecentNews/RecentNews";
import Footer from "../Components/Footer/Footer";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


const UserDashboard = () => {
  const navigate = useNavigate();

  const username = localStorage.getItem("userName");

 

  return (
    <div className="UserDashboard">
      <nav className="LandingNavbar">
  <div className="NavbarLogo">
    <WomanIcon fontSize="large" style={{ color: '#fff' }} />
    <span>Women Health & Wellness Portal</span>
  </div>
  <div className="NavbarLinks">
    
    <Button
      onClick={() => navigate("/profile")}
      variant="contained"
      className="NavButton"
      startIcon={<AccountCircleIcon />}
      style={{ marginRight: "10px" }}
    > Profile
     
    </Button>

  
    <Button
      onClick={() => {
       
        navigate("/");
      }}
      variant="contained"
      className="NavButton"
      style={{ backgroundColor: "#ec407a", color: "#fff" }}
    >
      Logout
    </Button>
  </div>
</nav>
      <Typography variant="h4" className="WelcomeTitle my-4">Welcome {username},</Typography>
<Typography variant="h6" className="WelcomeInfo my-3">
  Welcome to Women's Wellness and Health portal — we provide services exclusively for women
</Typography>



      <div className="TwoCols">
 
  <div className="FirstCol my-3">
    <ServiceColumn />
  </div>

 
  <div className="SecondCols my-3">
   <div className="SecondCol"> <SafetyTipColumn /></div>
       <div className="ForumCard">
      <h3 className="ForumTitle">Share Your Thoughts</h3>
      <p className="ForumText">
        Write about your experiences, ideas, or anything you want to share with our community. 
        Your voice matters!
      </p>
      <Button variant="contained" style={{
        backgroundColor: "#ec407a", 
        color: "#fff", 
        borderRadius: "25px",
        marginTop: "10px",
        textTransform: "none",
        
      }}
      
      onClick={()=>{navigate("/forum")}}>
        Go to Forum
      </Button>
    </div>
    
  </div>
</div>

<div className="RecentNewsWrapper">
      <RecentNews />
    </div>
  <Footer />
    </div>
  );
};

export default UserDashboard;
