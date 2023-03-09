import {OccupationalHealthcareEntry} from "../../types";

interface Props {
  entry: OccupationalHealthcareEntry;
}

const OccupationalHealthcareAdditional = ({entry}: Props) => (
  <div>
    <div>Employed in: {entry.employerName}</div>
    {entry.sickLeave && <div>Sick from {entry.sickLeave.startDate} to {entry.sickLeave.endDate}</div>}
  </div>
)

export default OccupationalHealthcareAdditional;