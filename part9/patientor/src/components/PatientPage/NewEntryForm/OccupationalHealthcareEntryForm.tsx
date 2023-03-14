import {Box, Button, Stack, TextField} from "@mui/material";
import React, {useState} from "react";
import {PickerChangeHandler} from "@mui/x-date-pickers/internals/hooks/usePicker/usePickerValue";
import dayjs from "dayjs";
import {DatePicker, DateValidationError} from "@mui/x-date-pickers";

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

  const onChangeDateLocal: (field: string) => PickerChangeHandler<dayjs.Dayjs | null, DateValidationError> = (field: string) => (newDate) => {
    if (newDate == null) {
      console.log('no new date from datepicker');
      return;
    }

    onChangeSickLeaveDate(field, newDate.format('YYYY-MM-DD'))
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
          <BaseEntryFields entry={entry} onChange={onChange} onChangeDate={onChangeDate} />
          <Stack spacing={2}>
            <TextField label={'employer name'} name={'employerName'} value={entry.employerName} onChange={onChange} />
            <DatePicker label={'sick leave start date'} value={dayjs(entry.sickLeave.startDate)} onChange={onChangeDateLocal('startDate')}/>
            <DatePicker label={'sick leave end date'} value={dayjs(entry.sickLeave.endDate)} onChange={onChangeDateLocal('endDate')}/>
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