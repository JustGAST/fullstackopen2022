const Statistics = ({good, neutral, bad}) => {
  let noReviews = "no reviews yet";

  const countAverage = () => ((1 * good) + (-1 * bad)) / all
  const countPositive = () => good / all * 100

  const all = good + neutral + bad;
  const average = all ? countAverage() : noReviews;
  const positive = all ? countPositive() : noReviews;

  return (
    <>
      <h2>Statistics</h2>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>

      <br/>

      <p>all {all}</p>
      <p>average {average}</p>
      <p>positive {positive} %</p>
    </>
  );
};

export default Statistics;