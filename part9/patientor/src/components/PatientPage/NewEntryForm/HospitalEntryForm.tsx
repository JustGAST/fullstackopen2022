import {Box, Button, Stack, TextField} from "@mui/material";
import React, {useState} from "react";

import {EntryType, NewHospitalEntry} from "../../../types";
import BaseEntryFields, {baseEntryInitialState} from "./BaseEntryFields";
import DatePicker from "./DatePicker";

interface Props {
  onCancel: () => void;
  onSubmit: (entry: NewHospitalEntry) => void;
}

const HospitalEntryForm = ({onCancel, onSubmit}: Props) => {
  const initialState: NewHospitalEntry = {
    ...baseEntryInitialState,
    type: EntryType.Hospital,
    discharge: {
      date: '',
      criteria: '',
    }
  };

  const [entry, setEntry] = useState<NewHospitalEntry>(initialState)

  const onChange: React.ChangeEventHandler<HTMLInputElement> = ({target}) => {
    setEntry({...entry, [target.name]: target.value});
  }

  const onChangeDischarge: React.ChangeEventHandler<HTMLInputElement> = ({target}) => {
    setEntry({...entry, discharge: {...entry.discharge, [target.name]: target.value}})
  }

  const onChangeDate = (newDate: string) => {
    setEntry({...entry, date: newDate})
  }

  const onChangeDischargeDate = (newDate: string) => {
    setEntry({...entry, discharge: {...entry.discharge, date: newDate}})
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
          <Box>Add new Hospital Entry</Box>
          <BaseEntryFields entry={entry} onChange={onChange} onChangeDate={onChangeDate} />
          <Stack spacing={2}>
            <DatePicker label={'discharge date'} value={entry.discharge.date} onChange={onChangeDischargeDate}/>
            <TextField label={'discharge criteria'} name={'criteria'} value={entry.discharge.criteria} onChange={onChangeDischarge} />
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

export default HospitalEntryForm;