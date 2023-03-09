import {HospitalEntry} from "../../types";

interface Props {
  entry: HospitalEntry;
}

const HospitalAdditional = ({entry}: Props) => (
  <div>
    Discharged {entry.discharge.date} because of {entry.discharge.criteria}
  </div>
)

export default HospitalAdditional;