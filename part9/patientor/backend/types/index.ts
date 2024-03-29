export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other'
}

export interface Diagnoses  {
    code: string;
    name: string;
    latin?: string;
}

// // eslint-disable-next-line @typescript-eslint/no-empty-interface
// export interface Entry {
// }

export interface Patient {
    id: string;
    name: string;
    dateOfBirth?: string;
    ssn?: string;
    gender: Gender;
    occupation: string;
}

export type PublicPatient = Omit<Patient, 'ssn' | 'entries' >;

export type patientData = Omit<Patient, 'id'>;