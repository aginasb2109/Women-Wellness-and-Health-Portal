import React from "react";
import "./DoctorDashboard.css";
import NavBar from "../../Components/NavBar/NavBar";
import Footer from "../../Components/Footer/Footer";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';




const DoctorDashboard = () => {
  const doctorName = localStorage.getItem("userName");

  // Sample appointments
  const appointments = [
    {
      id: 1,
      patientName: "Rajat Varshney",
      reason: "Regular check-up",
      notes: "Patient has mild fever, prescribed medication",
      time: "10:00 AM",
    },
    {
      id: 2,
      patientName: "Priya Singh",
      reason: "Skin allergy",
      notes: "Allergy improved with previous meds, follow-up in 1 week",
      time: "11:30 AM",
    },
    {
      id: 3,
      patientName: "Arjun Mehta",
      reason: "Knee pain",
      notes: "Recommended physiotherapy, check MRI report",
      time: "01:00 PM",
    },
  ];

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="doctor-board">
    <NavBar
  buttons={[
   
    { label: "Profile", path: "/profile", icon: AccountCircleIcon },
    { label: "Logout", path: "/" }
  ]}
/>
      <div className="doctor-dashboard">
      <div className="header">
        <h1>Welcome, {doctorName}</h1>
        <p className="today-date">{today}</p>
      </div>

      <div className="dashboard-content">
        {/* Left: Appointments List */}
        <div className="appointments-list">
          <h2>Appointments</h2>
          {appointments.map((app) => (
            <div key={app.id} className="appointment-card">
              <h3 className="patient-name">{app.patientName}</h3>
              <p className="reason"><strong>Reason:</strong> {app.reason}</p>
              <p className="notes"><strong>Notes:</strong> {app.notes}</p>
              <p className="time"><strong>Time:</strong> {app.time}</p>
            </div>
          ))}
        </div>

        {/* Right: Today's Date & Time (or could be calendar/time display) */}
        <div className="today-panel">
          <h2>Today</h2>
          {appointments.map((app) => (
            <div key={app.id} className="time-card">
              <p><strong>{app.time}</strong> - {app.patientName}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
    <Footer />
    </div>
  );
};

export default DoctorDashboard;
