import {CoursePart} from "../types";

interface ContentProps {
    courseParts: CoursePart[]
}

const Content = ({courseParts}: ContentProps) => (
    <>
        {courseParts.map(part => (
            <p key={part.name}>
                {part.name} {part.exerciseCount}
            </p>
        ))}
    </>
)

export default Content;