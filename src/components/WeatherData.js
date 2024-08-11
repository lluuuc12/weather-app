import axios from 'axios';
import { useState, useEffect } from 'react';
import { WeatherHourlyButton } from './WeatherHourlyButton';

export function WeatherData({ city, iconImage, ...props }) {
  const urlApiWeather = 'https://api.open-meteo.com/v1/forecast';
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    axios
      .get(
        urlApiWeather +
          `?latitude=${city.lat}&longitude=${city.long}&current=temperature_2m,weather_code&hourly=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=Europe%2FBerlin`
      )
      .then((e) => {
        console.log(e.data);
        setWeatherData(e.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [city.lat, city.long]);

  return (
    <div className="bg-neutral-800 p-4 rounded-2xl animate-fade">
      <h1 className="text-2xl font-bold mb-5">
        {city.name}{' '}
        {weatherData
          ? Math.round(weatherData.current.temperature_2m) +
            weatherData.current_units.temperature_2m
          : null}
      </h1>
      {weatherData ? (
        <WeatherHourlyButton weatherData={weatherData} iconImage={iconImage} />
      ) : null}
    </div>
  );
}
