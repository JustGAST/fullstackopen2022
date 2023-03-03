import {useMatch} from "react-router-dom";
import {useEffect, useState} from "react";
import {Typography} from "@mui/material";

import {Gender, Patient} from "../../types";
import patientsService from "../../services/patients"

const PatientPage = () => {
    const patientIdMatch = useMatch('/patients/:id')
    const [patient, setPatient] = useState<Patient|null>(null)

    useEffect(() => {
        const fetchPatient = async () => {
            if (!patientIdMatch || !patientIdMatch.params.id) {
                return;
            }

            const patient = await patientsService.getById(patientIdMatch.params.id);
            setPatient(patient);
        };

        void fetchPatient()
    })

    if (!patient) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <Typography variant="h4" style={{ margin: "0.5em 0" }}>
                {patient.name} {patient.gender === Gender.Male ? '♂' : '♀'}
            </Typography>
            <div>
                <div>
                    ssn: {patient.ssn}
                </div>
                <div>
                    occupation: {patient.occupation}
                </div>
            </div>
        </div>
    );
}

export default PatientPage;

