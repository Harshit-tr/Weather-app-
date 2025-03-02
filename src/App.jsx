import { useState, useEffect } from "react";
import Header from "./Components/header";
import { Box, Typography } from "@mui/material";
import WeatherCard from "./Components/weathercard";
import './index.css';

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

function App() {
  const [city, setCity] = useState("Delhi");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=746bfc32df9a7e7417c53249291da505&units=metric`);
        if (!response.ok) {
          throw new Error("Failed to fetch weather data");
        }
        const data = await response.json();
        setWeatherData({
          city: data.name,
          temp: data.main.temp,
          desc: data.weather[0].main,
          humidity: data.main.humidity,
          wind: data.wind.speed,
        });
      } catch (err) {
        setError(err.message);
      }
      setLoading(false);
    };

    fetchWeatherData();
  }, [city]);

  const backgroundColor = weatherData ? getBackgroundColor(weatherData.desc) : "linear-gradient(135deg, #ff9a9e, #fad0c4)";

  return (
    <>
      <Box
        sx={{
          width: "100vw",
          height: "100vh",
          background: backgroundColor,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <Header setCity={setCity} weatherDescription={weatherData ? weatherData.desc : "clear"}  />
        {loading ? (
          <Typography variant="h6">Loading...</Typography>
        ) : error ? (
          <Typography variant="h6">{error}</Typography>
        ) : (
          weatherData && (
            <WeatherCard
              city={weatherData.city}
              temp={weatherData.temp}
              desc={weatherData.desc}
              humidity={weatherData.humidity}
              wind={weatherData.wind}
            />
          )
        )}
      </Box>
    </>
  );
}

export default App;
