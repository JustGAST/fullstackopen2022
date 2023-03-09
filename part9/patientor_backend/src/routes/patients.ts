import express from "express";
import patientsService from "../services/patientsService";
import {toNewPatient} from "../utils/validators/patient";
import {handleError} from "../utils/errorsHandler";
import {toNewEntry} from "../utils/validators/entry";

const patientsRouter = express.Router();

patientsRouter.get('/:id', (req, res) => {
    const patient = patientsService.findById(String(req.params.id));

    if (patient) {
        res.send(patient);
    } else {
        res.sendStatus(404);
    }
});

patientsRouter.get('/', (_req, res) => {
    res.send(patientsService.getPatientsNonSensitive());
});

patientsRouter.post('/', (req, res) => {
    try {
        const patientInput = toNewPatient(req.body);
        const newPatient = patientsService.addPatient(patientInput);

        res.json(newPatient);
    } catch (error) {
        handleError(res, error);
    }
});

patientsRouter.post('/:id/entries', (req, res) => {
    try {
        const newEntry = toNewEntry(req.body);
        const patient = patientsService.addEntry(req.params.id, newEntry);

        res.json(patient);
    } catch (error) {
        handleError(res, error);
    }
});

export default patientsRouter;