import React from "react";
// import "../styles/WeatherButton.css";

export default function WeatherButton({ cities, handleCity }) {
  return (
    <div>
      <button onClick={() => handleCity("current")}>Current Location</button>
      {cities.map((city, index) => (
        <button key={index} onClick={() => handleCity(city)}>
          {city}
        </button>
      ))}
    </div>
  );
}
