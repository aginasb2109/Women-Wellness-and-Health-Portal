import { useState } from "react";
import { Box, Card, TextField, Typography, Divider, CircularProgress } from "@mui/material";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import NavBar from "../Components/NavBar/NavBar";
import Footer from "../Components/Footer/Footer";
import "./NWW.css";

const NutritionWellWisher = () => {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!query.trim()) {
      setResponse("Please enter a question about your diet or health 💡");
      return;
    }

    setLoading(true);
    setResponse(""); 

    try {
      const res = await axios.post("http://localhost:8080/user/Ai/nutrition", { query });
      setResponse(res.data); 
    } catch (err) {
      console.error(err);
      setResponse("⚠️ Error while getting advice! Please try again.");
    } finally {
      setLoading(false);
      setQuery(""); 
    }
  };

  return (
    <div className="nww">
      <NavBar />
      <div className="nutrition-container">
        <Card className="nutrition-card">
          <Typography variant="h4" className="nutrition-title">
            🌸 Nutrition Well-Wisher
          </Typography>
          <Typography variant="body2" className="nutrition-subtitle">
            Get personalized advice for your health & wellness journey ✨
          </Typography>

          <Divider sx={{ margin: "15px 0" }} />

          {/* Prompt Input */}
          <Box className="nutrition-prompt">
            <TextField
              label="Ask about your diet or nutrition..."
              variant="outlined"
              fullWidth
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />

            <Box sx={{ marginTop: 2 }}>
              <button className="nutrition-btn" onClick={handleAsk}>
                Get Wellness Advice
              </button>
            </Box>
          </Box>

          {/* Response Section */}
          <Box
            className="nutrition-response"
            sx={{
              marginTop: 3,
              minHeight: "100px",
              padding: 2,
              borderRadius: 2,
              backgroundColor: response ? "#f8d7f9" : "transparent", 
              transition: "background-color 0.3s ease",
            }}
          >
            {loading ? (
              <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: 80 }}>
                <CircularProgress />
              </Box>
            ) : response ? (
              <>
                <Typography variant="subtitle1" className="response-title">
                  🌿 Your Well-Wisher Says:
                </Typography>
                <Typography variant="body1" className="response-text">
                  <ReactMarkdown>{response}</ReactMarkdown>
                </Typography>
              </>
            ) : null}
          </Box>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default NutritionWellWisher;
