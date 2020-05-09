import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Country = (props) => {
  const c = props.country;
  const [weather, setWeather] = useState([]);
  const api_key = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    console.log('effe');
    axios
      .get(
        'http://api.weatherstack.com/current?access_key=' +
          api_key +
          '&query=' +
          c.name
      )
      .then((response) => {
        setWeather([response.data]);
        console.log('w', weather);
      });
  }, []);

  return (
    <div>
      <h2>{c.name}</h2>
      <p>capital {c.capital}</p>
      <p>population {c.population}</p>
      <h3>languages</h3>
      <ul>
        {c.languages.map((lang) => (
          <li key={lang.name}>{lang.name}</li>
        ))}
      </ul>
      <img src={c.flag} width='200px' height='auto' alt={c.name} />
      <p>{console.log(weather)}</p>
      {weather.length > 0 && weather[0].hasOwnProperty('success') !== true && (
        <div>
          <h3>Weather in {c.name}</h3>
          <p>
            <strong>temperature: </strong>
            {weather[0].current.temperature} Celsius
          </p>
          <img
            src={weather[0].current.weather_icons[0]}
            alt={weather[0].location.name}
            width='100px'
            height='auto'
          />
          <p>
            <strong>wind: </strong>
            {weather[0].current.wind_speed} mph {weather[0].current.wind_dir}
          </p>
        </div>
      )}
    </div>
  );
};

export default Country;
