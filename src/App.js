import { useEffect, useState } from "react";
import "./App.css";
import WeatherBox from "./components/WeatherBox";
import WeatherButton from "./components/WeatherButton";
import { ClipLoader } from "react-spinners";

const apikey = process.env.REACT_APP_API_KEY;

function App() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState(null);
  const [loading, setLoading] = useState(false);
  const [apiError, setAPIError] = useState("");
  const cities = ["seoul", "busan", "gwangju", "tokyo", "new york", "london"];

  const getWeatherByCurrentLocation = async (lat, lon) => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}&units=metric`;
      setLoading(true);
      const res = await fetch(url);
      const data = await res.json();
      setWeather(data);
      setLoading(false);
    } catch (err) {
      setLoading(true);
      setAPIError(err.message);
      setLoading(false);
    }
  };

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      let latitude = position.coords.latitude;
      let longitude = position.coords.longitude;
      getWeatherByCurrentLocation(latitude, longitude);
    });
  };

  const getWeatherByCity = async () => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`;
      setLoading(true);
      const res = await fetch(url);
      const data = await res.json();
      setWeather(data);
      setLoading(false);
    } catch (err) {
      setLoading(true);
      setAPIError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (city == null) {
      setLoading(true);
      getCurrentLocation();
    } else {
      setLoading(true);
      getWeatherByCity();
    }
    // eslint-disable-next-line
  }, [city]);

  const handleCity = (city) => {
    if (city === "current") {
      setCity(null);
    } else {
      setCity(city);
    }
  };

  return (
    <div>
      {loading ? (
        <ClipLoader color="#f88c6b" loading={loading} size={150} />
      ) : !apiError ? (
        <div className="container">
          <WeatherBox weather={weather} />
          <WeatherButton cities={cities} handleCity={handleCity} />
        </div>
      ) : (
        <div>{apiError}</div>
      )}
    </div>
  );
}

export default App;
