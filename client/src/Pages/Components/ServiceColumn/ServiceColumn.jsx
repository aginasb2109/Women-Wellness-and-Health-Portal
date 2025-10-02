import React from "react";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import "./ServiceColumn.css";
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import SpaIcon from '@mui/icons-material/Spa';


const ServicesColumn = () => {
  const navigate = useNavigate();

  const services = [
    { name: "Period Tracker", icon: <CalendarTodayIcon />, path: "/period-tracker" },
    { name: "Doctor Appointments", icon: <LocalHospitalIcon />, path: "/doctor-appointments" },
    { name: "Nutrition Well-Wisher", icon: <RestaurantIcon />, path: "/Nutrition" },
    { name: "Diet Plans", icon: <SpaIcon />, path: "/diet-plans" },
    { name: "Fitness Routines", icon: <FitnessCenterIcon />, path: "/fitness-routines" },
    
  ];

  return (
    <div className="FirstCol my-3">
      <Typography variant="h5" sx={{ mb: 2, color: "#4a148c" }}>Explore Our Services</Typography>
      <div className="ServiceButtons">
        {services.map((service, index) => (
          <Button
            key={index}
            variant="contained"
            startIcon={service.icon}
            className="ServiceButton"
            onClick={() => navigate(service.path)}
          >
            {service.name}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default ServicesColumn;
