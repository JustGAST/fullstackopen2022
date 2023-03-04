export type Diagnose = {
    code: string,
    name: string,
    latin?: string
};

export enum Gender {
    Male = "male",
    Female = "female",
    Other = "other"
}

export enum EntryType {
    HealthCheck = 'HealthCheck',
    OccupationalHealthcare = 'OccupationalHealthcare',
    Hospital = 'Hospital',
}

export enum HealthCheckRating {
    "Health"= 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3,
}

export interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    type: EntryType;
    diagnosisCode?: Array<Diagnose['code']>;
}

export interface HealthCheckEntry extends BaseEntry {
    type: EntryType.HealthCheck;
    healthCheckRating: HealthCheckRating;
}

export type Patient = {
    id: string,
    name: string,
    dateOfBirth: string,
    ssn: string,
    gender: Gender,
    occupation: string,
    entries: Entry[],
};

export type NewPatient = Omit<Patient, 'id'>;

export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;