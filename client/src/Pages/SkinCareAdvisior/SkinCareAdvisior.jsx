import React, { useState, useEffect, useRef } from "react";
import "./SkinCareAdvisior.css";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import SendIcon from "@mui/icons-material/Send";
import { Button, TextField, Typography, CircularProgress } from "@mui/material";
import axios from "axios";

const SkinCareAdvisior = () => {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "✨ Hi beautiful! I’m your GlowGuide AI. Ask me anything about skincare!",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatRef = useRef(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:8080/user/Ai/skincare",
        { query: input }
      );

      const botReply =
        response.data && typeof response.data === "string"
          ? response.data
          : "💧 Sorry, I couldn’t fetch skincare advice right now.";

      setMessages((prev) => [...prev, { sender: "bot", text: botReply }]);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "⚠️ Oops! Something went wrong. Please try again in a moment.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="SkincareAdvisorContainer">
      {/* Header */}
      <div className="PageHeader">
        <AutoAwesomeIcon className="HeaderIcon" />
        <Typography variant="h5" className="HeaderTitle">
          Your Personal AI Skincare Advisor
        </Typography>
      </div>

      {/* Chat Section */}
      <div className="ChatSection" ref={chatRef}>
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`MessageBubble ${
              msg.sender === "user" ? "UserBubble" : "BotBubble"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      {/* Input Bar */}
      <div className="InputBar">
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Ask your skincare question..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          className="InputField"
        />
        <Button
          variant="contained"
          className="SendButton"
          onClick={handleSend}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : <SendIcon />}
        </Button>
      </div>
    </div>
  );
};

export default SkinCareAdvisior;
