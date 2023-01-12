import StatisticLine from "./StatisticLine";

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

      <table>
        <colgroup>
          <col width={100} />
          <col />
        </colgroup>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={all} />
          <StatisticLine text="average" value={average} />
          <StatisticLine text="positive" value={positive} />
        </tbody>
      </table>
    </>
  );
};

export default Statistics;