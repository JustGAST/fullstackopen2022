import {Box, Button, Stack, TextField} from "@mui/material";
import React, {useState} from "react";
import DatePicker from "./DatePicker";

import BaseEntryFields, {baseEntryInitialState} from "./BaseEntryFields";
import {EntryType, NewOccupationalHealthcareEntry} from "../../../types";

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

  const onChangeDate = (newDate: string) => {
    setEntry({...entry, date: newDate})
  }

  const onChangeSickLeaveDate = (field: string, newDate: string) => {
    setEntry({...entry, sickLeave: {...entry.sickLeave, [field]: newDate}})
  }

  const onSubmitEntry = (e: React.SyntheticEvent) => {
    e.preventDefault();
    onSubmit(entry);
    setEntry(initialState);
  }

  return (
    <div>
      <form onSubmit={onSubmitEntry}>
        <Stack spacing={2}>
          <Box>Add new Occupational Healthcare Entry</Box>
          <BaseEntryFields entry={entry} onChange={onChange} onChangeDate={onChangeDate} />
          <Stack spacing={2}>
            <TextField label={'employer name'} name={'employerName'} value={entry.employerName} onChange={onChange} />
            <DatePicker label={'sick leave start date'} value={entry.sickLeave.startDate} onChange={(newDate) => onChangeSickLeaveDate('startDate', newDate)}/>
            <DatePicker label={'sick leave end date'} value={entry.sickLeave.endDate} onChange={(newDate) => onChangeSickLeaveDate('endDate', newDate)}/>
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