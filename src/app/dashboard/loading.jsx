"use client";
import { LinearProgress } from "@mui/material";
const LinearProgressBar = () => {
  return (
    <LinearProgress
      hidden={true}
      sx={{
        backgroundColor: "#e9ebee",
        "& .MuiLinearProgress-bar": {
          backgroundColor: "#004f80",
        },
      }}
    />
  );
};

export default LinearProgressBar;
