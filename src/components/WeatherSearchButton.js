import axios from 'axios';
import { useState, useEffect } from 'react';

export function WeatherSearchButton({ ...props }) {
  const apiKey = '66a78a732c2d9543809586myj292ba8';
  const [inputValue, setInputValue] = useState('');
  const [cityData, setCityData] = useState([]);

  const searchCity = () => {
    // Fetch city data based on inputValue
    const urlCityLatLon = `https://geocode.maps.co/search?q=${inputValue}&api_key=${apiKey}`;
    if (inputValue.trim()) {
      axios
        .get(urlCityLatLon)
        .then((response) => {
          console.log(response.data);
          setCityData(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      searchCity();
    }
  };

  const addCity = (i) => {
    const city = {
      name: cityData[i].display_name.replace(/,.*/, ''),
      lat: cityData[i].lat,
      lon: cityData[i].lon,
    };
    console.log(city);
  };

  useEffect(() => {
    if (inputValue === '') {
      setCityData([]);
    }
  }, [inputValue]);

  return (
    <div className="columns-1 mt-4">
      <div className="text-center">
        <input
          className="text-black p-2 border rounded mb-4"
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter city name"
        />
        <button
          className="mx-5 p-2 bg-neutral-800 rounded"
          onClick={searchCity}
        >
          Search
        </button>
      </div>
      {cityData.length > 0 && (
        <div className="flex justify-center">
          <div className="text-center">
            {cityData.map((c, i) => (
              <div key={i} className="mt-2 flex justify-between items-center">
                <p className="text-left">{c.display_name}</p>
                <button
                  key={i}
                  className="ml-10 rounded bg-neutral-800 p-2"
                  onClick={() => addCity(i)}
                >
                  +
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
