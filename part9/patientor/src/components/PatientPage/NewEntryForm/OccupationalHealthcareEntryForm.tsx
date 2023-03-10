import {Button} from "@mui/material";
import {NewOccupationalHealthcareEntry} from "../../../types";
import React from "react";

interface Props {
  onCancel: () => void;
  onSubmit: (entry: NewOccupationalHealthcareEntry) => void;
}

const OccupationalHealthcareEntryForm = ({onCancel}: Props) => {

  return (
    <div>
      <form>OccupationalHealthcare</form>

      <Button variant="outlined" color={"error"} onClick={onCancel}>Cancel</Button>
    </div>
  )
}

export default OccupationalHealthcareEntryForm;