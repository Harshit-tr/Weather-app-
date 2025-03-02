import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import WbSunnyIcon from "@mui/icons-material/WbSunny"; 
import CloudIcon from "@mui/icons-material/Cloud";
import RainIcon from "@mui/icons-material/Grain"; // Grain icon for rain
import SnowIcon from "@mui/icons-material/AcUnit";
import ThunderstormIcon from "@mui/icons-material/FlashOn";

const getWeatherIcon = (desc) => {
    switch (desc.toLowerCase()) {
    case "clear":
        case "sunny":
          return <WbSunnyIcon style={{ fontSize: 64 }} />;
        case "clouds":
          return <CloudIcon style={{ fontSize: 64 }} />;
        case "rain":
          return <RainIcon style={{ fontSize: 64 }} />;
        case "snow":
          return <SnowIcon style={{ fontSize: 64 }} />;
        case "thunderstorm":
          return <ThunderstormIcon style={{ fontSize: 64 }} />;
        default:
          return <WbSunnyIcon style={{ fontSize: 64 }} />;
  
}
}
const getBackgroundColor = (desc) => {
    switch (desc.toLowerCase()) {
      case "clear":
      case "sunny":
        return "linear-gradient(135deg, #FFD700, #FFA500)";
      case "clouds":
        return "linear-gradient(135deg, #B0C4DE, #778899)";
      case "rain":
        return "linear-gradient(135deg, #00CED1, #4682B4)";
      case "snow":
        return "linear-gradient(135deg, #E0FFFF, #B0E0E6)";
      case "thunderstorm":
        return "linear-gradient(135deg, #4B0082, #8A2BE2)";
      default:
        return "linear-gradient(135deg, #ff9a9e, #fad0c4)"; // Default background
    }
  };
export default function WeatherCard({ city, temp, desc, humidity, wind }) {
    const backgroundColor = getBackgroundColor(desc);
    const weatherIcon = getWeatherIcon(desc);
  return (
    <Card
      sx={{
        minWidth: 300,
        maxWidth: 400,
        background: backgroundColor,
        backdropFilter: "blur(10px)",
        padding: 2,
        borderRadius: 2,
        color: "#fff",
        textAlign: "center",
        position: "relative", 
        top: "-200px",
      }}
    >
      <CardContent>
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          {city}
        </Typography>
        <Box display="flex" alignItems="center" justifyContent="center" mt={2}>
          {weatherIcon}
          <Typography variant="h4" sx={{ marginLeft: 1 }}>
            {temp}°C
          </Typography>
        </Box>
        <Typography variant="body1" sx={{ textTransform: "capitalize" }}>
          {desc}
        </Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>
          Humidity: {humidity}%
        </Typography>
        <Typography variant="body2">Wind Speed: {wind} m/s</Typography>
      </CardContent>
    </Card>
  );
}
