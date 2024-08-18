import React from "react";
import "../styles/WeatherButton.css";

export default function WeatherButton({ cities, handleCity }) {
  return (
    <div className="weatherButtonSet">
      <button className="weatherButton" onClick={() => handleCity("current")}>
        CURRENT LOCATION
      </button>
      {cities.map((city, index) => (
        <button
          className="weatherButton"
          key={index}
          onClick={() => handleCity(city)}
        >
          {city.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
