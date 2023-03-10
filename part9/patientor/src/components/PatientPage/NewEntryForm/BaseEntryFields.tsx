import React from "react";
import {Stack, TextField} from "@mui/material";
import {NewBaseEntry} from "../../../types";

interface Props {
  entry: NewBaseEntry;
  onChange: React.ChangeEventHandler<HTMLInputElement>
}

export const baseEntryInitialState = {
  description: '',
  date: '',
  specialist: '',
  diagnosisCodes: [],
}

const BaseEntryFields = ({entry, onChange}: Props) => {
  return (
    <Stack spacing={2}>
      <TextField label='description' name='description' value={entry.description} onChange={onChange} />
      <TextField label='date' name='date' value={entry.date} onChange={onChange} />
      <TextField label='specialist' name='specialist' value={entry.specialist} onChange={onChange} />
      <TextField label='diagnosisCodes' name='diagnosisCodes' value={entry.diagnosisCodes} onChange={onChange} />
    </Stack>
  )
}

export default BaseEntryFields;