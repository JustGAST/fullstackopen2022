import {Box, Button, Stack, TextField} from "@mui/material";
import {EntryType, HealthCheckRating, NewHealthCheckEntry} from "../../../types";
import React, {useState} from "react";
import BaseEntryFields, {baseEntryInitialState} from "./BaseEntryFields";

interface Props {
  onCancel: () => void;
  onSubmit: (entry: NewHealthCheckEntry) => void;
}

const HealthCheckEntryForm = ({onCancel, onSubmit}: Props) => {
  const initialState: NewHealthCheckEntry = {
    ...baseEntryInitialState,
    type: EntryType.HealthCheck,
    healthCheckRating: HealthCheckRating.Health
  };

  const [entry, setEntry] = useState<NewHealthCheckEntry>(initialState)

  const onChange: React.ChangeEventHandler<HTMLInputElement> = ({target}) => {
    setEntry({...entry, [target.name]: target.value});
  }

  const onSubmitEntry = (e: React.SyntheticEvent) => {
    try {
      e.preventDefault();
      onSubmit(entry);
      setEntry(initialState);
    } catch (e) {
      console.log(e);
      throw e
    }
  }

  return (
    <div>
      <form onSubmit={onSubmitEntry}>
        <Stack spacing={2}>
          <Box>Add new HealthCheck Entry</Box>
          <BaseEntryFields entry={entry} onChange={onChange} />
          <Stack spacing={2}>
            <TextField label={'healthcheck rating'} name={'healthCheckRating'} value={entry.healthCheckRating} onChange={onChange} />
          </Stack>
          <Box>
            <Button type='submit' variant={'contained'}>Save</Button>
            <Button variant="outlined" color={"error"} onClick={onCancel}>Cancel</Button>
          </Box>
        </Stack>
      </form>

    </div>
  )
}

export default HealthCheckEntryForm;