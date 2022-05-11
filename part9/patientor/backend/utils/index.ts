import {Gender, patientData} from "../types";

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
    return Object.values(Gender).includes(param);
};

const parseName = (name: unknown): string => {
  if(!name || !isString(name)) {
      throw new Error('Incorrect Name ' + name);
  }
  return name;
};

const parseOccupation = (occupation: unknown): string => {
    if(!occupation || !isString(occupation)) {
        throw new Error('Incorrect occupation ' + occupation);
    }
    return occupation;
};

const parseSsn = (ssn: unknown): string => {
    if(!ssn || !isString(ssn)) {
        throw new Error('Incorrect ssn ' + ssn);
    }
    return ssn;
};

const parseDob = (dob: unknown): string => {
    if(!dob || !isString(dob) || !isDate(dob)) {
        throw new Error('Incorrect DOB ' + dob );
    }
    return dob;
};

const parseGender = (gender: unknown): Gender => {
    if(!gender || !isGender(gender)) {
        throw new Error('Incorrect Gender ' + gender);
    }
    return gender;
};

type Fields = {name: unknown, dateOfBirth?: unknown, ssn?: unknown, gender: unknown, occupation: unknown};

export const toNewPatient = (patientObj: Fields): patientData => {
    const {name, dateOfBirth, ssn, gender, occupation} = patientObj;
    return {
        name: parseName(name),
        dateOfBirth: parseDob(dateOfBirth),
        ssn: parseSsn(ssn),
        gender: parseGender(gender),
        occupation: parseOccupation(occupation)
    };
};