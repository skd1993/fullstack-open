import React from 'react';
const Country = ({ country }) => {
  if (!country) {
    return <div>not found...</div>;
  }

  return (
    <div>
      <h3>{country.name}</h3>
      <div>population {country.population}</div>
      <div>capital {country.capital}</div>
      <img
        src={country.flags.png}
        height='100'
        alt={`flag of ${country.name}`}
      />
    </div>
  );
};

export default Country;
