import {HealthCheckEntry} from "../../types";

interface Props {
  entry: HealthCheckEntry;
}

const HealthCheckAdditional = ({entry}: Props) => (
  <div>Risk level {entry.healthCheckRating}</div>
)

export default HealthCheckAdditional;