import {services} from '../services';
import {Request, Response} from "express";

import {Patient, Diagnoses, patientData} from "../types";
import {toNewPatient} from "../utils";

export const diagnosesRouter = (_req: Request, res: Response): void => {
    const toSend: Diagnoses[] = services.getDiagnoses();
    res.status(200).send(toSend);
};

export const patientsRouter = (_req: Request, res: Response): void => {
    const toSend: Patient[] = services.getPatients();
    res.status(200).send(toSend);
};

export const addPatientRouter = (req: Request, res: Response): void => {
    try {
        const newPatient = toNewPatient(req.body as patientData);
        const toAdd: Patient = services.addPatient(newPatient);
        res.status(200).send(toAdd);
    }
    catch(error: unknown) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
};