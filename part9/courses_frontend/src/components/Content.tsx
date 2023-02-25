import {CoursePart} from "../types";
import Part from "./Part";

interface ContentProps {
    courseParts: CoursePart[]
}

const Content = ({courseParts}: ContentProps) => (
    <>
        {courseParts.map(part => (
            <Part key={part.name} part={part}/>
        ))}
    </>
)

export default Content;