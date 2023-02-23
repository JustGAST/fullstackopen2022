import {v4 as uuidV4} from 'uuid';

import patients from "../../data/patients";
import {NewPatient, NonSensitivePatient, Patient} from "../types";


let patientsData = patients;

const findById = (id: string): Patient | undefined => {
    return patientsData.find(p => p.id === id);
};

const getPatients = (): Patient[] => patientsData;

const getPatientsNonSensitive = (): NonSensitivePatient[] => (
    patientsData.map(({id, name, dateOfBirth, gender, occupation}) => ({
        id, name, dateOfBirth, gender, occupation
    }))
);

const addPatient = (patient: NewPatient): NonSensitivePatient => {
    const newPatient: Patient = {
        id: uuidV4(),
        ...patient,
    };

    patientsData = patients.concat(newPatient);

    return newPatient;
};

export default {
    findById,
    getPatients,
    getPatientsNonSensitive,
    addPatient,
};