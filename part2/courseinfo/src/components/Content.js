import Part from "./Part";

const Content = ({parts}) => (
  <div>
    {parts.map(part =>
      <Part key={part.id} partName={part.name} exercisesNumber={part.exercises} />
    )}
  </div>
)

export default Content;