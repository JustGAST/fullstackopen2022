import {Box, Button, Stack, TextField} from "@mui/material";
import {EntryType, NewOccupationalHealthcareEntry} from "../../../types";
import React, {useState} from "react";
import BaseEntryFields, {baseEntryInitialState} from "./BaseEntryFields";

interface Props {
  onCancel: () => void;
  onSubmit: (entry: NewOccupationalHealthcareEntry) => void;
}

const OccupationalHealthcareEntryForm = ({onCancel, onSubmit}: Props) => {
  const initialState: NewOccupationalHealthcareEntry = {
    ...baseEntryInitialState,
    type: EntryType.OccupationalHealthcare,
    employerName: '',
    sickLeave: {
      startDate: '',
      endDate: '',
    }
  };

  const [entry, setEntry] = useState<NewOccupationalHealthcareEntry>(initialState)

  const onChange: React.ChangeEventHandler<HTMLInputElement> = ({target}) => {
    setEntry({...entry, [target.name]: target.value});
  }

  const onChangeSickLeave: React.ChangeEventHandler<HTMLInputElement> = ({target}) => {
    setEntry({...entry, sickLeave: {...entry.sickLeave, [target.name]: target.value}})
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
          <Box>Add new Occupational Healthcare Entry</Box>
          <BaseEntryFields entry={entry} onChange={onChange} />
          <Stack spacing={2}>
            <TextField label={'employer name'} name={'employerName'} value={entry.employerName} onChange={onChange} />
            <TextField label={'sick leave start date'} name={'startDate'} value={entry.sickLeave.startDate} onChange={onChangeSickLeave} />
            <TextField label={'sick leave end date'} name={'endDate'} value={entry.sickLeave.endDate} onChange={onChangeSickLeave} />
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

export default OccupationalHealthcareEntryForm;