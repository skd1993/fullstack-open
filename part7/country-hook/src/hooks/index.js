import { useState, useEffect } from 'react';
import axios from 'axios';

export const useField = (type) => {
  const [value, setValue] = useState('');

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};

export const useCountry = (name) => {
  const [country, setCountry] = useState(null);

  const fetchCountry = async () => {
    try {
      const res = await axios.get(
        `https://restcountries.com/v2/name/${name}?fullText=true`
      );
      if (res.data.status !== 404) {
        setCountry(res.data[0]);
      } else {
        setCountry();
      }
    } catch (err) {
      console.log('some error occurred');
    }
  };

  useEffect(() => {
    fetchCountry();
  }, [name]);

  return country;
};
