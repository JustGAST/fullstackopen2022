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
    diagnosisCodes?: Array<Diagnose['code']>;
}

export interface HealthCheckEntry extends BaseEntry {
    type: EntryType.HealthCheck;
    healthCheckRating: HealthCheckRating;
}

export interface OccupationalHealthcareEntry extends BaseEntry {
    type: EntryType.OccupationalHealthcare;
    employerName: string;
    sickLeave: {
        startDate: string;
        endDate: string;
    }
}

export interface HospitalEntry extends BaseEntry {
    type: EntryType.Hospital;
    discharge: {
        date: string;
        criteria: string;
    }
}

export type Entry = HealthCheckEntry | OccupationalHealthcareEntry | HospitalEntry;

// Define special omit for unions
export type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;
// Define Entry without the 'id' property
export type EntryWithoutId = UnionOmit<Entry, 'id'>;

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