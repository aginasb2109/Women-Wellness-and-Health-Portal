import React, { useState, useEffect } from "react";
import axios from "axios";
import "./PeriodTracker.css";
import toast from "react-hot-toast";
import { Button } from "@mui/material";
import ReactMarkdown from "react-markdown";
import NavBar from "../Components/NavBar/NavBar";
import Footer from "../Components/Footer/Footer";

const PeriodTracker = () => {
  const [periods, setPeriods] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [notes, setNotes] = useState("");
  const [adviceMap, setAdviceMap] = useState({});
  const [loadingMap, setLoadingMap] = useState({}); // per-cycle loading

  const userId = localStorage.getItem("userId");

  // Fetch periods on load
  useEffect(() => {
    console.log("User ID:", userId);
    if (userId) {
      fetchPeriods();
    } else {
      console.warn("User ID not found — please log in first");
      toast.error("User not found");
    }
  }, [userId]);

  const fetchPeriods = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/api/period/user/${userId}`);
      console.log("Fetched periods:", res.data);
      setPeriods(res.data);
    } catch (err) {
      console.error("Error fetching periods:", err);
      
    }
  };

  const addPeriod = async () => {
    if (!startDate || !endDate) {
      toast.error("Please fill in both start and end date");
      return;
    }
    console.log("Add Period clicked");
    try {
      await axios.post(`http://localhost:8080/api/period/add/${userId}`, {
        startDate,
        endDate,
        notes,
      });

      toast.success("Period record added successfully!");
      setStartDate("");
      setEndDate("");
      setNotes("");
      fetchPeriods();
    } catch (err) {
      
      toast.error("Something went wrong while adding period record.");
    }
  };

  const getCycleAdvice = async (cycle, index) => {
    console.log("Button clicked for Advice, cycle:", index);
    setLoadingMap((prev) => ({ ...prev, [index]: true }));

    try {
      const res = await axios.post("http://localhost:8080/user/Ai/advice", {
        startDate: cycle.startDate,
        endDate: cycle.endDate,
        notes: cycle.notes || "",
      });

      console.log("AI Advice received:", res.data);
      setAdviceMap((prev) => ({ ...prev, [index]: res.data }));
    } catch (err) {
      console.error("Error fetching AI advice:", err);
      
    } finally {
      setLoadingMap((prev) => ({ ...prev, [index]: false }));
    }
  };

  return (
    <div className="Period">
      <NavBar  buttons={[ { label: "Dashboard", path: "/dashboard" }]}/>
      <div className="tracker-container">
      {/* Left: Period History */}
      <div className="tracker-left">
        <h2>Your Period History</h2>

        {periods.length > 0 ? (
          <ul className="period-list">
            {periods.map((p, i) => (
              <li key={i} className="period-item">
                <strong className="name-color">Cycle {i + 1}</strong>
                <p className="subname-color">Start: <span className="sub-color">{p.startDate}</span></p>
                <p className="subname-color">End: <span className="sub-color">{p.endDate}</span></p>
                <p className="subname-color">Notes:<span className="sub-color">{p.notes || "None"}</span> </p>

                {/* AI Advice Button */}
                <Button
                  type="button"
                  
                  onClick={() => getCycleAdvice(p, i)}
                  disabled={loadingMap[i]}
                  sx={{background: "linear-gradient(90deg, #ff4081, #9c27b0)",color:"white"}}
                >
                  {loadingMap[i] ? (
    <>
      <span className="loader"></span> Loading...
    </>
  ) : (
    "Get AI Advice"
  )}
                </Button>

                {/* Display AI advice */}
                {adviceMap[i] && (
  <div className="advice-output">
    <strong className="name-color">AI Advice:</strong>
    <ReactMarkdown>{String(adviceMap[i] || "")}</ReactMarkdown>
  </div>
)}
              </li>
            ))}
          </ul>
        ) : (
          <>
            <p>No records yet. Add your first period below.</p>
            {/* Temporary Test Button to ensure clicks */}
            
          </>
        )}
      </div>

      {/* Right: Add Period Form */}
      <div className="tracker-form">
        <h2>Add New Period</h2>

        <label>Start Date:</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />

        <label>End Date:</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />

        <label>Notes:</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Optional notes..."
        />

        <button type="button" onClick={addPeriod}>
          Add Period
        </button>
      </div>
    </div>
    <Footer />
    </div>
  );
};

export default PeriodTracker;
