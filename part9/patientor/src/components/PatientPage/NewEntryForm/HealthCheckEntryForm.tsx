import {Button} from "@mui/material";
import {NewHealthCheckEntry} from "../../../types";
import React from "react";

interface Props {
  onCancel: () => void;
  onSubmit: (entry: NewHealthCheckEntry) => void;
}

const HealthCheckEntryForm = ({onCancel, onSubmit}: Props) => {

  return (
    <div>
      <form>HealthCheck</form>

      <Button variant="outlined" color={"error"} onClick={onCancel}>Cancel</Button>
    </div>
  )
}

export default HealthCheckEntryForm;