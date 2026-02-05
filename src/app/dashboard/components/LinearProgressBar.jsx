"use client"
import { LinearProgress } from "@mui/material"
const LinearProgressBar = ({status})=>{
    return(
        <LinearProgress
              hidden={status}
              sx={{
                backgroundColor: "#e9ebee",
                "& .MuiLinearProgress-bar": {
                  backgroundColor: "#004f80", 
                },
              }}
            />
    )
}

export default LinearProgressBar