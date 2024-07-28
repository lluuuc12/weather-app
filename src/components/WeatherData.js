import axios from 'axios';
import { useState, useEffect } from 'react';
import { WeatherIcon } from './WeatherIcon';
import { WeatherButton } from './WeatherButton';

export function WeatherData({ city, iconImage, ...props }) {
  const urlApiWeather = 'https://api.open-meteo.com/v1/forecast';
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    axios
      .get(
        urlApiWeather +
          `?latitude=${city.lat}&longitude=${city.long}&current=temperature_2m&hourly=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min`
      )
      .then((e) => {
        console.log(e.data);
        setWeatherData(e.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const d = new Date();
  let day = d.getDay();

  const formatTime = (timeString) => {
    const date = new Date(timeString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="bg-neutral-800 p-4 rounded-2xl">
      <h1 className="text-2xl font-bold mb-5">
        {city.name}{' '}
        {weatherData
          ? weatherData.current.temperature_2m +
            weatherData.current_units.temperature_2m
          : null}
      </h1>
      {weatherData ? (
        <WeatherButton
          days={days}
          day={day}
          weatherData={weatherData}
          iconImage={iconImage}
        />
      ) : null}
    </div>
  );
}
