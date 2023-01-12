import Form from "./Form";
import Statistics from "./Statistics";

function App({store}) {
  const {good, neutral, bad} = store.getState();

  const handleGood = () => store.dispatch({type: 'GOOD'});
  const handleNeutral = () => store.dispatch({type: 'NEUTRAL'});
  const handleBad = () => store.dispatch({type: 'BAD'});

  return (
    <div>
      <Form handleGood={handleGood} handleNeutral={handleNeutral} handleBad={handleBad} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
}

export default App;
