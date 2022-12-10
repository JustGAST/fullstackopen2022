import CountryDetails from "./CountryDetails";

const CountriesList = ({countries}) => {
    if (countries.length > 10) {
        return <p>Too many countries, specify another filter</p>
    } else if (countries.length > 1) {
        return (
          <ul>
              {countries.map(country =>
                <li key={country.cca3}>{country.name.common}</li>
              )}
          </ul>
        )
    } else if (countries.length === 1) {
        return <CountryDetails country={countries[0]} />
    }
};

export default CountriesList;