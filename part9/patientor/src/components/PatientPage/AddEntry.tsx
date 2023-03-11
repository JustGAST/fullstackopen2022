import {Alert, Button} from "@mui/material";
import React, {useState} from "react";
import {EntryType, NewEntry, Patient} from "../../types";
import HealthCheckEntryForm from "./NewEntryForm/HealthCheckEntryForm";
import HospitalEntryForm from "./NewEntryForm/HospitalEntryForm";
import OccupationalHealthcareEntryForm from "./NewEntryForm/OccupationalHealthcareEntryForm";
import patientsService from '../../services/patients';
import axios from "axios";

interface Props {
  patientId: Patient['id'];
  onSave: (patient: Patient) => void;
}

const AddEntry = ({patientId, onSave}: Props) => {
  const [entryType, setEntryType] = useState('');
  const [error, setError] = useState<string>('');
  const onCancel = () => setEntryType('')
  const onSubmit = async (entry: NewEntry) => {
    try {
      const patient = await patientsService.addEntry(patientId, entry)
      onSave(patient);
      setError('')
    }
    catch (e) {
      if (axios.isAxiosError(e) && e.response && 'data' in e.response && 'error' in e.response.data) {
        setError(e.response.data.error);
      } else {
        console.log(e)
      }
    }
  }

  return (
    <>
      <Button variant="outlined" onClick={() => setEntryType(EntryType.Hospital)} style={{marginRight: 10}}>Add Hospital Entry</Button>
      <Button variant="outlined" onClick={() => setEntryType(EntryType.HealthCheck)} style={{marginRight: 10}}>Add HealthCheck Entry</Button>
      <Button variant="outlined" onClick={() => setEntryType(EntryType.OccupationalHealthcare)}>Add OccupationalHealthcare Entry</Button>

      <div style={{margin: "30px 0"}}>
        {error && (
          <Alert severity={'error'} sx={{marginBottom: 2}}>{error}</Alert>
        )}
        {
          entryType === EntryType.Hospital &&
          <HospitalEntryForm onSubmit={onSubmit} onCancel={onCancel} />
        }
        {
          entryType === EntryType.HealthCheck &&
          <HealthCheckEntryForm onSubmit={onSubmit} onCancel={onCancel} />
        }
        {
          entryType === EntryType.OccupationalHealthcare &&
          <OccupationalHealthcareEntryForm onSubmit={onSubmit} onCancel={onCancel} />
        }
      </div>
    </>
  )
}

export default AddEntry;