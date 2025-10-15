import React, { useState } from "react";
import {
  Card, CardContent, Typography, Button, Grid, Box, Avatar, Divider
} from "@mui/material";
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import "./Doctor.css";
import NavBar from "../Components/NavBar/NavBar";
import Footer from "../Components/Footer/Footer";

const Doctor = () => {
  const patientName = localStorage.getItem("userName");

  const doctors = [
    { id: 1, name: "Dr. Ananya Sharma", specialization: "Cardiologist", availability: "Mon-Fri 10AM-4PM", img: "https://i.pravatar.cc/150?img=1" },
    { id: 2, name: "Dr. Rahul Verma", specialization: "Dermatologist", availability: "Tue-Thu 12PM-6PM", img: "https://i.pravatar.cc/150?img=2" },
    { id: 3, name: "Dr. Priya Singh", specialization: "Pediatrician", availability: "Mon, Wed, Fri 9AM-2PM", img: "https://i.pravatar.cc/150?img=3" },
    { id: 4, name: "Dr. Arjun Mehta", specialization: "Orthopedic", availability: "Tue-Fri 11AM-5PM", img: "https://i.pravatar.cc/150?img=4" },
  ];

  const initialHistory = [
    { id: 1, doctor: doctors[0], appointmentTime: new Date().toISOString() },
    { id: 2, doctor: doctors[2], appointmentTime: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString() },
  ];

  const [history, setHistory] = useState(initialHistory);

  const bookAppointment = (doctor) => {
    const newAppointment = {
      id: history.length + 1,
      doctor,
      appointmentTime: new Date().toISOString(),
    };
    setHistory([newAppointment, ...history]);
  };

  return (
    <div className="doctor">
      <NavBar  buttons={[ { label: "Dashboard", path: "/dashboard" }]}/>
      <Box className="doctor-dashboard">
      <Box className="header-section">
        <Typography variant="h4" className="page-title">
          Welcome, {patientName} 👋
        </Typography>
        <Typography variant="subtitle1" className="page-subtitle">
          Find and book appointments with our top specialists
        </Typography>
      </Box>

      <Box className="content-wrapper">
        {/* Left: Doctors */}
        <Box className="doctor-section">
          <Typography variant="h6" className="section-title">Available Doctors</Typography>
          <Box className="doctor-list">
            {doctors.map(doc => (
              <Card key={doc.id} className="doctor-card">
                <Box className="doctor-card-top">
                  <Avatar src={doc.img} className="doctor-avatar" />
                  <Box className="doctor-info">
                    <Typography className="doctor-name">{doc.name}</Typography>
                    <Typography className="doctor-special">
                      <LocalHospitalIcon fontSize="small" /> {doc.specialization}
                    </Typography>
                    <Typography className="doctor-avail">
                      <AccessTimeIcon fontSize="small" /> {doc.availability}
                    </Typography>
                  </Box>
                </Box>
                <Divider sx={{ my: 1 }} />
                <Button className="book-btn" onClick={() => bookAppointment(doc)}>
                  Book Appointment
                </Button>
              </Card>
            ))}
          </Box>
        </Box>

        {/* Right: Appointment History */}
        <Box className="history-section">
          <Typography variant="h6" className="section-title">Appointment History</Typography>
          <Divider sx={{ mb: 2 }} />
          <Box className="history-container">
            {history.length === 0 ? (
              <Typography className="no-history">No appointments yet</Typography>
            ) : (
              history.map(app => (
                <Card key={app.id} className="history-card">
                  <CardContent className="history-card-content">
                    <Avatar src={app.doctor.img} className="history-avatar" />
                    <Box>
                      <Typography className="history-doctor">{app.doctor.name}</Typography>
                      <Typography className="history-special">{app.doctor.specialization}</Typography>
                      <Typography className="history-time">
                        {new Date(app.appointmentTime).toLocaleString()}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              ))
            )}
          </Box>
        </Box>
      </Box>
    </Box>
<Footer />
    </div>
  );
};

export default Doctor;
