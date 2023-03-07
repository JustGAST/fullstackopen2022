import {Entry} from '../../types';

interface Props {
    entry: Entry;
}

const PatientEntry = ({entry}: Props) => (
    <div>
        {entry.date} <i>{entry.description}</i>
        {entry.diagnosisCodes && (
            <ul>
                {entry.diagnosisCodes.map(code => (
                    <li>{code}</li>
                ))}
            </ul>
        )}
    </div>
)

export default PatientEntry;