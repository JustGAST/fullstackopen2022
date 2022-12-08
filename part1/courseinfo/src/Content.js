import Part from "./Part";

const Content = (props) => (
  <div>
    <Part partName={props.parts[0].name} exercisesNumber={props.parts[0].exercises} />
    <Part partName={props.parts[1].name} exercisesNumber={props.parts[1].exercises} />
    <Part partName={props.parts[2].name} exercisesNumber={props.parts[2].exercises} />
  </div>
)

export default Content;