import { WeatherIcon } from './WeatherIcon';
import { useState } from 'react';

export function WeatherButton({ weatherData, iconImage, ...props }) {
  const [showHourly, setShowHourly] = useState(null);

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const d = new Date();
  let today = d.getDay();

  const formatTime = (timeString) => {
    const date = new Date(timeString);
    return date.toLocaleTimeString([], { hour: '2-digit' });
  };

  const isNight = (hour) => {
    return hour >= 21 || hour < 7;
  };

  const handleDayClick = (i) => {
    if (showHourly === i) {
      setShowHourly(null);
    } else {
      setShowHourly(i);
    }
  };

  return (
    <>
      <div className="flex gap-5 text-center flex-wrap z-20 relative">
        {weatherData.daily.time.map((w, i) => {
          return (
            <button
              key={i}
              className="hover:bg-neutral-500 p-1 rounded-lg cursor-pointer transition duration-300"
              onClick={() => handleDayClick(i)}
            >
              <WeatherIcon
                key={days[(today + i) % 7]}
                title={days[(today + i) % 7]}
                icon={iconImage[weatherData.daily.weather_code[i]].day.image}
                description={
                  iconImage[weatherData.daily.weather_code[i]].day.description
                }
                temps={[
                  weatherData.daily.temperature_2m_max[i],
                  weatherData.daily.temperature_2m_min[i],
                ]}
              />
            </button>
          );
        })}
      </div>
      <div
        className={`flex gap-5 text-center mt-2 bg-neutral-700 rounded-lg w-full ${
          showHourly == null ? 'max-h-0' : 'px-2 py-3 max-h-full'
        } overflow-x-auto overflow-y-hidden custom-scrollbar transition-all animate-fade-down z-10 relative duration-500`}
      >
        {showHourly != null &&
          weatherData.hourly.time
            .slice(showHourly * 24, (showHourly + 1) * 24)
            .map((w, i) => {
              const hour = new Date(
                weatherData.hourly.time[showHourly * 24 + i]
              ).getHours();
              const icon = isNight(hour)
                ? iconImage[
                    weatherData.hourly.weather_code[showHourly * 24 + i]
                  ].night.image
                : iconImage[
                    weatherData.hourly.weather_code[showHourly * 24 + i]
                  ].day.image;
              const description = isNight(hour)
                ? iconImage[
                    weatherData.hourly.weather_code[showHourly * 24 + i]
                  ].night.description
                : iconImage[
                    weatherData.hourly.weather_code[showHourly * 24 + i]
                  ].day.description;
              return (
                <div key={i}>
                  <WeatherIcon
                    title={formatTime(
                      weatherData.hourly.time[showHourly * 24 + i]
                    )}
                    icon={icon}
                    description={description}
                    mini={true}
                    temps={[
                      weatherData.hourly.temperature_2m[showHourly * 24 + i],
                    ]}
                  />
                </div>
              );
            })}
      </div>
    </>
  );
}
