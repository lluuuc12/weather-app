import './App.css';
import axios from 'axios';
import data from './cities.json';
import { WeatherData } from './components/WeatherData';
import { useEffect, useState } from 'react';

function App() {
  const urlCodeIcons =
    'https://gist.githubusercontent.com/stellasphere/9490c195ed2b53c707087c8c2db4ec0c/raw/76b0cb0ef0bfd8a2ec988aa54e30ecd1b483495d/descriptions.json';
  const apiKey = '66a78a732c2d9543809586myj292ba8';
  const [iconImage, setIconImage] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [cityData, setCityData] = useState([]);

  useEffect(() => {
    // Fetch icon image data
    axios
      .get(urlCodeIcons)
      .then((response) => {
        console.log(response.data);
        setIconImage(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
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
  }, [inputValue]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <>
      <header className="mt-5 p-3 text-center">
        <h1 className="text-5xl font-bold text-white">Weather App</h1>
      </header>
      <div className="columns-1">
        <input
          className="text-black p-2 border rounded mb-4"
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter city name"
        />
        {inputValue ? (
          <div>
            {cityData.map((c, i) => {
              return (
                <div>
                  <p>{cityData[i].display_name}</p>
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
      <div className="p-4 m-3 grid lg:grid-cols-2 grid-cols-1 gap-3">
        {data.cities.map((c) => {
          return <WeatherData key={c.name} city={c} iconImage={iconImage} />;
        })}
      </div>
    </>
  );
}

export default App;
