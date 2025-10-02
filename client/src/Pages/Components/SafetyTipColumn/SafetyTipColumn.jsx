import React from "react";
import Typography from "@mui/material/Typography";
import SafetyImage from "../../../assets/Images/SafetyTip.png";
import "./SafetyTipColumn.css";

const SafetyTipColumn = () => {
  return (
    <div className="SecondCol my-3">
      <div className="SafetyContent">
        <img src={SafetyImage} alt="Women Safety" className="SafetyImage" />
        <Typography variant="h5" className="TipHeading">
          # Safety Tip
        </Typography>
        <Typography variant="body1" className="TipText">
          Always carry a personal safety alarm when going out alone.
        </Typography>
      </div>
    </div>
  );
};

export default SafetyTipColumn;
