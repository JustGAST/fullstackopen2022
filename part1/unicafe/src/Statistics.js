const Statistics = ({good, neutral, bad}) => {
  const all = good + neutral + bad;
  const header = <h2>Statistics</h2>;

  if (!all) {
    return (
      <>
        {header}
        <p>No feedback given</p>
      </>
    )
  }

  const average = ((1 * good) + (-1 * bad)) / all;
  const positive = good / all * 100;

  return (
    <>
      {header}
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