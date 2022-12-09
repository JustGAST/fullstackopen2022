const Total = ({parts}) => (
  <b>
    total of&nbsp;
    {parts.reduce((sum, part) => sum + part.exercises, 0)}
    &nbsp;exercises
  </b>
);

export default Total;