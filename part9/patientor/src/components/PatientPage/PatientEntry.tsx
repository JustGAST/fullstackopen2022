import {Diagnose, Entry} from '../../types';

interface Props {
    entry: Entry;
    diagnoses: Diagnose[]
}

const PatientEntry = ({entry, diagnoses}: Props) => {
    const diagnosesItems = entry.diagnosisCodes && entry.diagnosisCodes.map(code => (
      <li>{code} {diagnoses.find(d => d.code === code)?.name}</li>
    ))

    return (
      <div>
          {entry.date} <i>{entry.description}</i>
          {entry.diagnosisCodes && (
            <ul>
                {diagnosesItems}
            </ul>
          )}
      </div>
    );
}

export default PatientEntry;