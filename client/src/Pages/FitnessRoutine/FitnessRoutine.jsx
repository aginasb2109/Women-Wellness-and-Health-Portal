import React, { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import "./FitnessRoutine.css";
import { Button, TextField, CircularProgress} from "@mui/material";
import Footer from "../Components/Footer/Footer";
import NavBar from "../Components/NavBar/NavBar";

export default function FitnessRoutine() {
  const [goal, setGoal] = useState("weight_loss");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [intensity, setIntensity] = useState("moderate");
  const [aiResponse, setAiResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function getRoutine(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setAiResponse("");

    const fitnessData = {
      weight: Number(weight),
      height: Number(height),
      goal,
      intensity,
    };

    try {
      const res = await axios.post(
        "http://localhost:8080/user/Ai/routine",
        fitnessData
      );

      
      let markdown = res.data;

     
     markdown = markdown
  .replace(/\\n/g, "\n")
  .replace(/\r/g, "")
  .replace(/[ ]{2,}/g, " ") 
  .trim();

      setAiResponse(markdown);
    } catch (err) {
      console.error(err);
      setError(err.response?.data || err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  }

  return (
   <div className="fit">
     <NavBar  buttons={[ { label: "Dashboard", path: "/dashboard" }]}/>
     <div className="fitness-wrapper">
      <div className="fitness-form-section">
        <h1 className="fitness-title">🏋️‍♀️ AI-Powered Fitness Planner</h1>
        <p className="fitness-subtitle">
          Get your personalized weekly fitness routine instantly!
        </p>

        <form onSubmit={getRoutine} className="fitness-form">
          <TextField
            label="Weight (kg)"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Height (cm)"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            select
            label="Goal"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            SelectProps={{ native: true }}
            fullWidth
            margin="normal"
          >
            <option value="weight_loss">Weight Loss</option>
            <option value="strength">Strength</option>
            <option value="flexibility">Flexibility & Mobility</option>
            <option value="wellness">General Wellness</option>
          </TextField>
          <TextField
            select
            label="Intensity"
            value={intensity}
            onChange={(e) => setIntensity(e.target.value)}
            SelectProps={{ native: true }}
            fullWidth
            margin="normal"
          >
            <option value="low">Low</option>
            <option value="moderate">Moderate</option>
            <option value="high">High</option>
          </TextField>

          <div className="button-group">
            <Button
              type="submit"
              variant="contained"
              disabled={loading}
              className="gradient-btn"
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : "Generate Routine"}
            </Button>
          </div>
        </form>
      </div>

      <div className="fitness-output-section">
        {error && <div className="error-message">{error}</div>}

        {aiResponse ? (
          <div className="routine-display">
            <ReactMarkdown>{aiResponse}</ReactMarkdown>
          </div>
        ) : (
          <div className="routine-placeholder">
            <h3>Your AI-generated fitness routine will appear here 💪</h3>
            <p>Fill in your details on the left and let AI design your weekly workout plan.</p>
          </div>
        )}
      </div>
    </div>
    <Footer />
   </div>
  );
}
