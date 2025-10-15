import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, Button, Grid, TextField, CircularProgress } from "@mui/material";
import axios from "axios";
import "./DietPlans.css";
import NavBar from "../Components/NavBar/NavBar";
import Footer from "../Components/Footer/Footer";
import ReactMarkdown from "react-markdown";

const DietPlans = () => {
  const [userQuery, setUserQuery] = useState("");
  const [aiResponse, setAiResponse] = useState(null);
  const [dietPlans, setDietPlans] = useState([]);
  const [loading, setLoading] = useState(false);
  const username = localStorage.getItem("userName");

  // Fetch existing diet plans
  useEffect(() => {
    axios.get("http://localhost:8080/user/api/plan")
      .then(res => setDietPlans(res.data))
      .catch(err => console.error(err));
  }, []);

  // Helper to convert array of objects to markdown string
  const renderMarkdownContent = (content) => {
    if (!content) return "";

    if (Array.isArray(content)) {
      return content.map(item => {
        let md = `### ${item.meal}\n\n`;
        if (item.description) md += `**Description:** ${item.description}\n\n`;
        if (item.portions) md += `**Portions:** ${item.portions}\n\n`;
        if (item.tips) md += `**Tips:** ${Array.isArray(item.tips) ? item.tips.join(", ") : item.tips}\n\n`;
        if (item.benefits) md += `**Benefits:** ${item.benefits.join(", ")}\n\n`;
        return md;
      }).join("\n");
    }

    return content.toString();
  };

  const handleAskAI = async () => {
    if (!userQuery.trim()) return;
    setLoading(true);
    setAiResponse(null);

    try {
      const response = await axios.post("http://localhost:8080/user/Ai/diet", {
        query: userQuery,
      });

      let parsedResponse = { title: "", subTitle: "", content: [] };

      try {
        const jsonStart = response.data.indexOf("{");
        const jsonEnd = response.data.lastIndexOf("}");
        if (jsonStart !== -1 && jsonEnd !== -1) {
          parsedResponse = JSON.parse(response.data.substring(jsonStart, jsonEnd + 1));
          if (!Array.isArray(parsedResponse.content)) {
            parsedResponse.content = [parsedResponse.content];
          }
        } else {
          parsedResponse.content = [{ meal: response.data }];
        }
      } catch (err) {
        parsedResponse.content = [{ meal: response.data }];
      }

      setAiResponse(parsedResponse);
      setUserQuery("");
    } catch (err) {
      setAiResponse({ content: [{ meal: "AI is preparing your personalized diet plan... Please try again later!" }] });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="Diet">
      <NavBar  buttons={[ { label: "Dashboard", path: "/dashboard" }]}/>
      <div className="diet-container">
        {/* Left Section - Ask AI */}
        <div className="diet-left">
          <Typography variant="h4" className="diet-title">
            🩷 Hi {username}, Ask AI for a Personalized Diet Plan
          </Typography>
          <Typography variant="body1" className="diet-subtext">
            Get instant nutrition suggestions tailored for your goals.
          </Typography>

          <TextField
            fullWidth
            label="Ask something (e.g., Best diet for PCOS)"
            variant="outlined"
            value={userQuery}
            onChange={e => setUserQuery(e.target.value)}
            className="diet-input"
          />

          <Button
            variant="contained"
            onClick={handleAskAI}
            className="diet-button"
            disabled={loading}
            style={{ background: "linear-gradient(90deg, #d81b60, #8e24aa)" }}
          >
            {loading ? <CircularProgress size={24} style={{ color: "#fff" }} /> : "Ask AI"}
          </Button>

          {aiResponse && (
            <div className="diet-response" style={{ marginTop: "20px" }}>
              {aiResponse.title && <Typography variant="h6" style={{ color: "#8e24aa" }}>{aiResponse.title}</Typography>}
              {aiResponse.subTitle && <ReactMarkdown>{aiResponse.subTitle}</ReactMarkdown>}
              <ReactMarkdown>{renderMarkdownContent(aiResponse.content)}</ReactMarkdown>
            </div>
          )}
        </div>

        {/* Right Section - Recommended Diet Plans */}
        <div className="diet-right">
          <Typography variant="h4" className="diet-right-title">Recommended Diet Plans</Typography>

          <Grid container spacing={3}>
            {dietPlans.map(plan => (
              <Grid item xs={12} sm={6} key={plan.id}>
                <Card className="diet-card">
                  {plan.imageUrl && <img src={plan.imageUrl} alt={plan.title} className="diet-img" />}
                  <CardContent>
                    <Typography variant="h5" className="diet-card-title">{plan.title}</Typography>
                    <Typography variant="subtitle1" className="diet-card-subtitle">{plan.subTitle}</Typography>
                    <Button
                      variant="contained"
                      size="small"
                      style={{
                        marginTop: "10px",
                        background: "linear-gradient(90deg, #d81b60, #8e24aa)",
                        color: "#fff",
                        borderRadius: "20px",
                        textTransform: "none",
                      }}
                    >
                      Ask Ai for Plan
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DietPlans;
