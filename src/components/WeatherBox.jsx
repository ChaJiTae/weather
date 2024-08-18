import React from "react";
import "../styles/WeatherBox.css";
import cityIcon from "../images/cityIcon.png";
import tempIcon from "../images/tempIcon.png";
import humidityIcon from "../images/humidityIcon.png";
import weatherIconThem from "../images/weatherIconThem.png";

export default function WeatherBox({ weather }) {
  return (
    <div className="WeatherSet">
      <div className="cityContainer">
        <img className="cityIcon" alt="cityIcon" src={cityIcon} />
        <div className="currentCity">현재 도시 : {weather?.name}</div>
      </div>
      <div className="tempContainer">
        <img className="tempIcon" alt="tempIcon" src={tempIcon} />
        <div className="currentTemp">
          섭씨 : {weather?.main.temp} °C / 화씨 :{" "}
          {(weather?.main.temp * 1.8 + 32).toFixed(2)} °F
        </div>
      </div>
      <div className="weatherIconContainer">
        <img
          className="weatherIconThem"
          alt="weatherIconThem"
          src={weatherIconThem}
        />
        <div className="currentWeather">
          날씨 : {weather?.weather[0].description?.toUpperCase()}
        </div>
      </div>
      <div className="humidityContainer">
        <img className="humidityIcon" alt="humidityIcon" src={humidityIcon} />
        <div className="currentHumidity">습도 : {weather?.main.humidity}</div>
      </div>
    </div>
  );
}
