import {CoursePart, CoursePartBase} from "../types";

interface PartProps {
    part: CoursePart;
}

const Part = ({part}: PartProps) => {
    let extra = <></>;
    switch (part.kind) {
        case "basic":
            extra = (
                <div>
                    <i>{part.description}</i>
                </div>
            )
            break;
        case "group":
            extra = (
                <div>project exercises {part.groupProjectCount}</div>
            )
            break;
        case "background":
            extra = (
                <>
                    <div>
                        <i>{part.description}</i>
                    </div>
                    <div>
                        {part.backgroundMaterial}
                    </div>
                </>
            )
            break;
        case "special":
            extra = (
                <>
                    <div>
                        <i>{part.description}</i>
                    </div>
                    <div>
                        required skills: {part.requirements.map(skill => skill).join(", ")}
                    </div>
                </>
            )
    }

    const basePart = part as CoursePartBase;
    return (
        <p>
            <strong>{basePart.name} {basePart.exerciseCount}</strong>
            {extra}
        </p>
    )
}

export default Part;