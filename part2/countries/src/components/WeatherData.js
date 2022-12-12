import {useEffect, useState} from "react";
import axios from "axios";

const WeatherData = ({capital, capitalInfo}) => {
  const API_KEY = process.env.REACT_APP_OPEN_WEATHER_KEY;
  const {latlng: [lat, lon]} = capitalInfo;

  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;

  const [weatherData, setWeatherData] = useState({});
  const isLoaded = Object.keys(weatherData).length > 0;

  useEffect(() => {
    axios
      .get(weatherUrl)
      .then(response => setWeatherData(response.data))
  }, [weatherUrl]);

  return (
    isLoaded && (
      <>
        <p>Temperature {weatherData.main.temp} &deg;C</p>
        <img
          src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
          alt={`${capital} weather icon`}
        />
        <p>Wind {weatherData.wind.speed} m/s</p>
      </>
    )
  )
}

export default WeatherData;