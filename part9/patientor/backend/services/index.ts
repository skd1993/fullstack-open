import diagnosesData from '../data/diagnoses.json';
import patientsData from '../data/patients.json';

import {v1 as uuid} from 'uuid';

import {Patient, Diagnoses} from "../types";

const getDiagnoses = (): Diagnoses[] => {
    return diagnosesData;
};

const getPatients = (): Patient[] => {
    return patientsData as Patient[];
};

const getPatientById = (id: string): Patient | undefined => {
    return patientsData.find(p => p.id === id) as Patient;
};

const addPatient = (patientInfo: Omit<Patient, 'id'>): Patient => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-call
    const id: string = uuid();
    return {id, ...patientInfo};
};

export const services = {
    getDiagnoses,
    getPatients,
    addPatient,
    getPatientById
};