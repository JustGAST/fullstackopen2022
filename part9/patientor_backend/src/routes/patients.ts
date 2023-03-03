import express from "express";
import patientsService from "../services/patientsService";
import {toNewPatient} from "../utils/validators/patient";
import {handleError} from "../utils/errorsHandler";

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

export default patientsRouter;