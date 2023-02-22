export type Diagnose = {
    code: string,
    name: string,
    latin?: string
};

type Male = "male" | "female" | "other";

export type Patient = {
    id: string,
    name: string,
    dateOfBirth: string,
    ssn: string,
    gender: Male,
    occupation: string,
};

export type NonSensitivePatient = Omit<Patient, 'ssn'>;