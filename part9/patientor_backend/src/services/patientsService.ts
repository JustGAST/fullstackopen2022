import {v4 as uuidV4} from 'uuid';

import patients from "../../data/patients";
import {EntryWithoutId, NewPatient, NonSensitivePatient, Patient} from "../types";


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

const addEntry = (patientId: string, entry: EntryWithoutId): Patient => {
    const patient = findById(patientId);
    if (!patient) {
        throw new Error("no patient with such id");
    }

    patient.entries = patient.entries.concat({
        id: uuidV4(),
        ...entry
    });

    patientsData = patientsData.map(p => p.id === patientId ? patient : p);

    return patient;
};

export default {
    findById,
    getPatients,
    getPatientsNonSensitive,
    addPatient,
    addEntry
};