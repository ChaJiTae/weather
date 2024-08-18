import { useEffect, useState } from "react";
import "./App.css";
import WeatherBox from "./components/WeatherBox";
import WeatherButton from "./components/WeatherButton";
import weatherIcon from "./images/weatherIcon.png";
import { FadeLoader } from "react-spinners";

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
      <div className="titleSet">
        <img alt="weatherIcon" className="titleImage" src={weatherIcon} />
        <h1 className="titleText">WEATHER WEP</h1>
      </div>
      <div className="contentContiner">
        {loading ? (
          <div className="loadingSet">
            <FadeLoader color="#ffffff" loading={loading} size={150} />
            <h1 className="LoadingTitle">데이터를 불러오고 있어요!</h1>
          </div>
        ) : !apiError ? (
          <div className="contentWeatherSet">
            <div className="contentWeatherBox">
              <WeatherBox weather={weather} />
            </div>
            <div className="contentWeatherButton">
              <WeatherButton cities={cities} handleCity={handleCity} />
            </div>
          </div>
        ) : (
          <div className="apiErrorContainer">
            <div className="apiErrorTitle">오류가 발생하였습니다!</div>
            <div className="apiErrorText">오류 코드 : {apiError}</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
