import { useEffect, useState } from "react";
import "./App.css";
import WeatherBox from "./components/WeatherBox";
import WeatherButton from "./components/WeatherButton";

function App() {
  const [weather, setWeather] = useState(null);

  const getWeatherByCurrentLocation = async (latitude, longitude) => {
    let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=242f66d0fb6fb0c42d7a0f9d2926c0d1&units=metric`;
    let response = await fetch(apiURL);
    let data = await response.json();
    setWeather(data);
  };

  useEffect(() => {
    const getCurrentLocation = () => {
      navigator.geolocation.getCurrentPosition((position) => {
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;
        getWeatherByCurrentLocation(latitude, longitude);
      });
    };

    getCurrentLocation();
  }, []);

  return (
    <div>
      <WeatherBox weather={weather} />
      <WeatherButton />
    </div>
  );
}

export default App;
