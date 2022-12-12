const CountryDetails = ({country}) => {
  const languagesArray = [];
  Object.keys(country.languages).forEach(key => {
    languagesArray.push(country.languages[key]);
  })

  return (
    <>
      <h2>{country.name.common}</h2>
      <p>
        Capital: {country.capital[0]}
        <br/>
        Area: {country.area}
      </p>
      <h3>Languages:</h3>
      <ul>
        {languagesArray.map(language => <li key={language}>{language}</li>)}
      </ul>
      <img src={country.flags.svg} alt={`${country.name.common} flag`} width={500}/>
    </>
  );
};

export default CountryDetails;