import {ReactNode} from "react";

import {assertNever, Diagnose, Entry, EntryType} from '../../types';
import HealthCheckAdditional from "./HealthCheckAdditional";
import HospitalAdditional from "./HospitalAdditional";
import OccupationalHealthcareAdditional from "./OccupationalHealthcareAdditional";

interface Props {
    entry: Entry;
    diagnoses: Diagnose[]
}

const PatientEntry = ({entry, diagnoses}: Props) => {
    const diagnosesItems = entry.diagnosisCodes && entry.diagnosisCodes.map(code => (
      <li key={code}>{code} {diagnoses.find(d => d.code === code)?.name}</li>
    ))

    let extra: ReactNode;
    switch (entry.type) {
        case EntryType.HealthCheck:
            extra = <HealthCheckAdditional entry={entry} />
            break;
        case EntryType.Hospital:
            extra = <HospitalAdditional entry={entry} />
            break;
        case EntryType.OccupationalHealthcare:
            extra = <OccupationalHealthcareAdditional entry={entry} />
            break;
        default:
            assertNever(entry);
    }

    return (
      <div style={{margin: "10px 0"}}>
          {entry.date} <i>{entry.description}</i>
          {entry.diagnosisCodes && (
            <ul>
                {diagnosesItems}
            </ul>
          )}
          <div>Type: {entry.type}</div>
          {extra}
          <div>
              Diagnose by {entry.specialist}
          </div>
      </div>
    );
}

export default PatientEntry;