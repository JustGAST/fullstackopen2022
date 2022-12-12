import {useEffect, useState} from "react";
import axios from "axios";

import Filter from "./components/Filter";
import CountriesList from "./components/CountriesList";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log(response.data);
        setCountries(response.data)
      })
  }, []);

  const countriesShown = countries.filter(
    country => country.name.common.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h1>Countries</h1>
      <Filter filter={filter} onChange={(e) => setFilter(e.target.value)}/>

      <CountriesList countries={countriesShown} />
    </div>
  );
}

export default App;
