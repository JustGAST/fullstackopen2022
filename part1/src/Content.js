import Part from "./Part";

const Content = (props) => (
  <div>
    <Part partName={props.part1} partExercises={props.exercises1} />
    <Part partName={props.part2} partExercises={props.exercises2} />
    <Part partName={props.part3} partExercises={props.exercises3} />
  </div>
)

export default Content;