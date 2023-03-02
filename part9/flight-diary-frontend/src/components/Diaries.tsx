import {DiaryEntry} from "../types";

interface DiariesProps {
    diaries: DiaryEntry[]
}

const Diaries = ({diaries}: DiariesProps) => {
    return <div>
        {diaries.map(entry => (
            <div key={entry.id} style={{margin: "10px 0"}}>
                <span>
                    <div>
                        <strong>{entry.date}</strong>
                    </div>
                    <div>
                        Weather: {entry.weather}, Visibility: {entry.visibility}
                    </div>
                    <div>
                        <i>{entry.comment}</i>
                    </div>
                </span>
            </div>
        ))}
    </div>;
}

export default Diaries;