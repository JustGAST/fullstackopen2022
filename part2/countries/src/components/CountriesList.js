import CountryDetails from "./CountryDetails";
import {useState} from "react";

const CountriesList = ({countries}) => {
    const [detailsShown, setDetailsShown] = useState({});

    const showDetails = (countryName) => () => {
      setDetailsShown({...detailsShown, [countryName]: true})
    };

    const hideDetails = (countryName) => () => {
      const newDetailsShown = {...detailsShown}
      delete newDetailsShown[countryName];
      setDetailsShown(newDetailsShown)
    }

    const isDetailsShown = (countryName) => countryName in detailsShown;

    if (countries.length > 10) {
        return <p>Too many countries, specify another filter</p>
    } else if (countries.length > 1) {
        return (
          <ul>
            {countries.map(country =>
              <li key={country.cca3}>
                {country.name.common}&nbsp;
                {
                  isDetailsShown(country.name.common)
                    ? (
                      <>
                        <button onClick={hideDetails(country.name.common)}>hide</button>
                        <CountryDetails country={country}/>
                      </>
                    )
                    : <button onClick={showDetails(country.name.common)}>show</button>
                }
              </li>
            )}
          </ul>
        )
    } else if (countries.length === 1) {
        return <CountryDetails country={countries[0]} />
    }
};

export default CountriesList;