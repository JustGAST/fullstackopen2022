import patients from "../../data/patients";
import {NonSensitivePatient, Patient} from "../types";


const getPatients = (): Patient[] => patients;

const getPatientsNonSensitive = (): NonSensitivePatient[] => (
    patients.map(({id, name, dateOfBirth, gender, occupation}) => ({
        id, name, dateOfBirth, gender, occupation
    }))
);
export default {
    getPatients,
    getPatientsNonSensitive,
};