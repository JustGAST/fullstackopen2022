import Button from "./Button";

const Form = ({handleGood, handleNeutral, handleBad}) => (
  <>
    <h2>Give feedback</h2>
    <Button onClick={handleGood} text="good" />
    <Button onClick={handleNeutral} text="neutral" />
    <Button onClick={handleBad} text="bad" />
  </>
);

export default Form;