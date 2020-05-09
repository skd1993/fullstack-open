import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Country from './components/Country';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all').then((response) => {
      console.log(response.data);
      setCountries(response.data);
    });
  }, []);

  const setCountryFilter = (event) => {
    const toFind = event.target.value.toLowerCase();
    const res = countries.filter(
      (f) => f.name.toLowerCase().indexOf(toFind) > -1
    );
    console.log(res);
    setFiltered(res);
  };

  let showFiltered = null;
  let l = filtered.length;
  if (l > 10) {
    showFiltered = <p>Too many matches, specify another filter</p>;
  } else if (l === 1) {
    const c = filtered[0];
    showFiltered = <Country country={c} />;
  } else {
    const x = filtered.map((c) => {
      return (
        <div key={c.alpha2Code}>
          <p>
            {c.name}
            <button onClick={() => setFiltered([c])}>show</button>
          </p>
        </div>
      );
    });
    console.log(x);
    showFiltered = x;
  }

  return (
    <div>
      find countries
      <input onChange={setCountryFilter} />
      {filtered.length > 0 && showFiltered}
    </div>
  );
};

export default App;
