import { WeatherIcon } from './WeatherIcon';
import { useState } from 'react';

/*
<div className="bg-neutral-800 p-4 rounded-2xl">
      <h1 className="text-2xl font-bold mb-5">
        {city.name}{' '}
        {weatherData
          ? weatherData.current.temperature_2m +
            weatherData.current_units.temperature_2m
          : null}
      </h1>
      {weatherData ? (
        <>
          <div className="flex gap-5 text-center flex-wrap">
            {weatherData.daily.time.map((w, i) => {
              return (
                <WeatherButton
                  days={days}
                  day={day}
                  i={i}
                  iconImage={iconImage}
                  weatherData={weatherData}
                />
              );
            })}
          </div>
          <div className="flex gap-5 text-center mt-2 bg-neutral-700 rounded-lg px-2 py-3 overflow-x-auto custom-scrollbar">
            {weatherData.hourly.time.slice(0, 24).map((w, i) => {
              return (
                <div>
                  <WeatherIcon
                    title={formatTime(weatherData.hourly.time[i])}
                    icon={
                      iconImage[weatherData.hourly.weather_code[i]].day.image
                    }
                    mini={true}
                    temps={[weatherData.hourly.temperature_2m[i]]}
                  />
                </div>
              );
            })}
          </div>
        </>
      ) : null}
    </div>
*/

/*
<button
      className="hover:bg-neutral-500 p-1 rounded-lg cursor-pointer"
      onClick={handleDayClick}
    >
      <WeatherIcon
        key={days[(today + i) % 7]}
        title={days[(today + i) % 7]}
        icon={iconImage[weatherData.daily.weather_code[i]].day.image}
        temps={[
          weatherData.daily.temperature_2m_max[i],
          weatherData.daily.temperature_2m_min[i],
        ]}
      />
</button>
*/

export function WeatherButton({ weatherData, iconImage, ...props }) {
  const [showHourly, setShowHourly] = useState(false);

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const d = new Date();
  let today = d.getDay();

  const formatTime = (timeString) => {
    const date = new Date(timeString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleDayClick = () => {
    setShowHourly(!showHourly);
  };
  return (
    <>
      <div className="flex gap-5 text-center flex-wrap">
        {weatherData.daily.time.map((w, i) => {
          return (
            <button
              className="hover:bg-neutral-500 p-1 rounded-lg cursor-pointer"
              onClick={handleDayClick}
            >
              <WeatherIcon
                key={days[(today + i) % 7]}
                title={days[(today + i) % 7]}
                icon={iconImage[weatherData.daily.weather_code[i]].day.image}
                temps={[
                  weatherData.daily.temperature_2m_max[i],
                  weatherData.daily.temperature_2m_min[i],
                ]}
              />
            </button>
          );
        })}
      </div>
      {showHourly && (
        <div className="flex gap-5 text-center mt-2 bg-neutral-700 rounded-lg px-2 py-3 overflow-x-auto custom-scrollbar">
          {weatherData.hourly.time.slice(0, 24).map((w, i) => {
            return (
              <div>
                <WeatherIcon
                  title={formatTime(weatherData.hourly.time[i])}
                  icon={iconImage[weatherData.hourly.weather_code[i]].day.image}
                  mini={true}
                  temps={[weatherData.hourly.temperature_2m[i]]}
                />
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
