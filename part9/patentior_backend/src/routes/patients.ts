import express from "express";
import patientsService from "../services/patientsService";

const patientsRouter = express.Router();

patientsRouter.get('/', (_req, res) => {
    res.send(patientsService.getPatientsNonSensitive());
});

export default patientsRouter;