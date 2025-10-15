import React, { useState } from "react";
import { Box, Typography, Button, Grid, TextField } from "@mui/material";
import "./AdminDashboard.css";
import NavBar from "../../Components/NavBar/NavBar";
import Footer from "../../Components/Footer/Footer";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const AdminDashboard = () => {
  const adminName =  localStorage.getItem("userName");
  const [safetyNotice, setSafetyNotice] = useState("");
  const [newsList, setNewsList] = useState(["", "", ""]);
  const [doctorAppointments, setDoctorAppointments] = useState([
    {
      id: 1,
      patientName: "Rajat Varshney",
      doctorName: "Dr. Ananya Sharma",
      appointmentTime: new Date().toISOString(),
      reason: "Regular check-up",
      notes: "Patient mentioned mild chest pain.",
    },
    {
      id: 2,
      patientName: "Aditi Sharma",
      doctorName: "Dr. Priya Singh",
      appointmentTime: new Date().toISOString(),
      reason: "Pediatric consultation",
      notes: "Follow-up vaccination required.",
    },
  ]);

  const handleAddSafetyNotice = () => {
    console.log("Safety Notice Added:", safetyNotice);
    setSafetyNotice("");
  };

  const handleAddNews = (index) => {
    console.log("News Added:", newsList[index]);
    const updatedNews = [...newsList];
    updatedNews[index] = "";
    setNewsList(updatedNews);
  };

  return (
    <div className="admin">
      <NavBar buttons={[{ label: "Profile", path: "/profile", icon: AccountCircleIcon },
    { label: "Logout", path: "/" }]} />
      <Box className="admin-dashboard">
      {/* Welcome Text */}
      <Typography variant="h4" className="welcome-text">
        Welcome, <span className="gradient-text">{adminName}</span>
      </Typography>

      {/* Top Section */}
      <Box className="top-section">
        {/* Safety Notice Panel - Left */}
        <Box className="panel safety-panel">
          <Typography className="panel-title">Add Safety / Top Notice</Typography>
          <TextField
            fullWidth
            placeholder="Enter notice..."
            variant="outlined"
            value={safetyNotice}
            onChange={(e) => setSafetyNotice(e.target.value)}
            className="input-field"
          />
          <Button className="gradient-btn" onClick={handleAddSafetyNotice} sx={{color:"white"}}>
            Add Notice
          </Button>
        </Box>

        {/* Recent News Panel - Extreme Right */}
        <Box className="panel news-panel">
          <Typography className="panel-title">Add Recent News</Typography>
          {newsList.map((news, index) => (
            <Box key={index} className="news-item">
              <TextField
                fullWidth
                placeholder={`News ${index + 1}`}
                variant="outlined"
                value={news}
                onChange={(e) => {
                  const updatedNews = [...newsList];
                  updatedNews[index] = e.target.value;
                  setNewsList(updatedNews);
                }}
                className="input-field"
              />
              <Button className="gradient-btn" onClick={() => handleAddNews(index)} sx={{color:"white"}}>
                Add
              </Button>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Doctor Appointments */}
      <Box className="appointments-section">
        <Typography className="section-header">Doctor Appointments History</Typography>
        <Box className="appointments-table">
          {doctorAppointments.map((app, index) => (
            <Box key={app.id} className={`appointment-row ${index % 2 === 0 ? "even" : "odd"}`}>
              <Box className="appointment-left">
                <Typography className="appointment-patient">{app.patientName}</Typography>
                <Typography className="appointment-doctor">{app.doctorName}</Typography>
              </Box>
              <Box className="appointment-right">
                <Typography className="appointment-time">
                  {new Date(app.appointmentTime).toLocaleString()}
                </Typography>
                <Typography className="appointment-reason">Reason: {app.reason}</Typography>
                {app.notes && <Typography className="appointment-notes">Notes: {app.notes}</Typography>}
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
    <Footer />
    </div>
  );
};

export default AdminDashboard;
