import React from "react";
import "../styles/WeatherBox.css";

export default function WeatherBox({ weather }) {
  return (
    <div className="WeatherSet">
      <div className="currentCity">{weather?.name}</div>
      <div className="currentTemp">
        {weather?.main.temp} / {(weather?.main.temp * 1.8 + 32).toFixed(2)}
      </div>
      <div className="currentWeather">{weather?.weather[0].description}</div>
      <div className="currentHumidity">{weather?.main.humidity}</div>
    </div>
  );
}
