import WeatherData from "./WeatherData";

const Weather = ({capital, capitalInfo}) => {
  const isCapitalInfoPresent = Object.keys(capitalInfo).length > 0;

  return (
    <>
      <h3>Weather in {capital}</h3>
      {isCapitalInfoPresent && <WeatherData capital={capital} capitalInfo={capitalInfo} />}
      {!isCapitalInfoPresent && 'unavailable'}
    </>
  )
};

export default Weather;