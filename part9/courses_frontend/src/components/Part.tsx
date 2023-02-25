import {CoursePart} from "../types";

interface PartProps {
    part: CoursePart;
}

const Part = ({part}: PartProps) => {
    switch (part.kind) {
        case "basic":
            return (
                <>
                    <strong>{part.name} {part.exerciseCount}</strong>
                    <i>{part.description}</i>
                </>
            )
    }

    return <></>
}

export default Part;