import {Box, Button, FormControl, InputLabel, MenuItem, Select, Stack} from "@mui/material";
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

  const onChangeDate = (newDate: string) => {
    setEntry({...entry, date: newDate})
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

  const healthCheckRating = HealthCheckRating;
  const healthCheckRatingKeys: number[] = Object.keys(healthCheckRating).map(k => Number(k)).filter(k => !isNaN(k));

  return (
    <div>
      <form onSubmit={onSubmitEntry}>
        <Stack spacing={2}>
          <Box>Add new HealthCheck Entry</Box>
          <BaseEntryFields entry={entry} onChange={onChange} onChangeDate={onChangeDate}/>
          <Stack spacing={2}>
            <FormControl>
              <InputLabel id='healthcheck-rating-label'>Healthcheck rating</InputLabel>
              <Select
                labelId='healthcheck-rating-label'
                value={entry.healthCheckRating}
                onChange={({target}) => setEntry({...entry, healthCheckRating: target.value as HealthCheckRating})}
              >
                {healthCheckRatingKeys.map(ratingKey => (
                    <MenuItem key={ratingKey} value={ratingKey}>{healthCheckRating[ratingKey]}</MenuItem>
                ))}
              </Select>
            </FormControl>
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