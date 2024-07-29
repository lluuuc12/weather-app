import './App.css';
import axios from 'axios';
import data from './cities.json';
import { WeatherData } from './components/WeatherData';
import { useEffect, useState } from 'react';

function App() {
  const urlCodeIcons =
    'https://gist.githubusercontent.com/stellasphere/9490c195ed2b53c707087c8c2db4ec0c/raw/76b0cb0ef0bfd8a2ec988aa54e30ecd1b483495d/descriptions.json';
  const [iconImage, setIconImage] = useState(null);

  useEffect(() => {
    // fetch weatherIcons
    axios
      .get(urlCodeIcons)
      .then((e) => {
        console.log(e.data);
        setIconImage(e.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <>
      <header className="mt-5 p-3 text-center">
        <h1 className="text-5xl font-bold text-white">Weather App</h1>
      </header>
      <div className="p-4 m-3 grid lg:grid-cols-2 grid-cols-1 gap-3">
        {data.cities.map((c) => {
          return <WeatherData key={c.name} city={c} iconImage={iconImage} />;
        })}
      </div>
    </>
  );
}

export default App;
