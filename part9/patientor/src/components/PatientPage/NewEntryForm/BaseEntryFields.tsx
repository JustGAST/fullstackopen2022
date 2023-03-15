import React, {useEffect, useState} from "react";
import {MenuItem, Select, Stack, TextField} from "@mui/material";
import DatePicker from "./DatePicker";

import {Diagnose, NewBaseEntry} from "../../../types";
import diagnosesService from "../../../services/diagnoses";
import {SelectChangeEvent} from "@mui/material/Select/SelectInput";

interface Props {
  entry: NewBaseEntry;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onChangeDate: (newDate: string) => void
}

export const baseEntryInitialState = {
  description: '',
  date: '',
  specialist: '',
  diagnosisCodes: [],
}

const BaseEntryFields = ({entry, onChange, onChangeDate}: Props) => {
  const [diagnoses, setDiagnoses] = useState<Diagnose[]>([]);

  const onChangeDiagnosisCodes: (event: SelectChangeEvent<string[]>, child: React.ReactNode) => void = (event) => {
    // @ts-ignore
    onChange(event);
  }

  useEffect(() => {
    if (diagnoses.length > 0) {
      return;
    }

    diagnosesService.getAll()
      .then((diagnoses) => {
        setDiagnoses(diagnoses);
      })
      .catch(e => console.log(e));
  }, [diagnoses])

  return (
    <Stack spacing={2}>
      <TextField label='description' name='description' value={entry.description} onChange={onChange}/>
      <DatePicker label={'date'} value={entry.date} onChange={onChangeDate}/>
      <TextField label='specialist' name='specialist' value={entry.specialist} onChange={onChange}/>
      <Select
        value={entry.diagnosisCodes || ''}
        onChange={onChangeDiagnosisCodes}
        name='diagnosisCodes'
        multiple
        displayEmpty
        renderValue={(selected) => {
          if (selected.length === 0) {
            return <em>diagnosis codes</em>;
          }

          return selected.join(', ');
        }}
      >
        <MenuItem disabled value="">
          <em>diagnosis codes</em>
        </MenuItem>
        {diagnoses.map(diagnose => (
          <MenuItem
            key={diagnose.code}
            value={diagnose.code}
          >
            {diagnose.code}
          </MenuItem>
        ))}
      </Select>
    </Stack>
  )
}

export default BaseEntryFields;