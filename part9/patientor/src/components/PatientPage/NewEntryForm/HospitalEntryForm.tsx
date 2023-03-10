import {Box, Button, Stack, TextField} from "@mui/material";
import {EntryType, NewHospitalEntry} from "../../../types";
import React, {useState} from "react";
import BaseEntryFields, {baseEntryInitialState} from "./BaseEntryFields";

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

  const onSubmitEntry = (e: React.SyntheticEvent) => {
    try {
      e.preventDefault();
      onSubmit(entry);
      setEntry(initialState);
    } catch (e) {
      throw e
    }
  }

  return (
    <div>
      Hospital
      <form onSubmit={onSubmitEntry}>
        <BaseEntryFields entry={entry} onChange={onChange} />
        <Stack spacing={2}>
          <TextField label={'discharge date'} name={'date'} value={entry.discharge.date} onChange={onChangeDischarge} />
          <TextField label={'discharge criteria'} name={'criteria'} value={entry.discharge.criteria} onChange={onChangeDischarge} />
        </Stack>
        <Box sx={{margin: "10px 0"}}>
          <Button type='submit' variant={'contained'}>Save</Button>
          <Button variant="outlined" color={"error"} onClick={onCancel}>Cancel</Button>
        </Box>
      </form>

    </div>
  )
}

export default HospitalEntryForm;