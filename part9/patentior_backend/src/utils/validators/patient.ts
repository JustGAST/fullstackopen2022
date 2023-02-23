import {Gender, NewPatient} from "../../types";
import {isDate, isString} from "./common";

export const toNewPatient = (data: unknown): NewPatient => {
    if (!(data && typeof data == 'object')) {
        throw new Error("data is not present or not an object");
    }

    if (!("name" in data && "dateOfBirth" in data && "gender" in data && "occupation" in data && "ssn" in data)) {
        throw new Error("some fields are missing: name, dateOfBirth, gender, occupation, ssn");
    }

    return {
        name: parseName(data.name),
        dateOfBirth: parseDate(data.dateOfBirth),
        gender: parseGender(data.gender),
        occupation: parseOccupation(data.occupation),
        ssn: parseSsn(data.ssn)
    };
};

const parseName = (name: unknown): string => {
    return parseString("name", name);
};

const parseDate = (date: unknown): string => {
    if (!isDate(date)) {
        throw new Error("date should be in correct format");
    }

    return date;
};

const parseGender = (gender: unknown): Gender => {
    if (!(isString(gender) && isGender(gender))) {
        throw new Error("gender should be one of type");
    }

    return gender;
};

const parseOccupation = (occupation: unknown): string => {
    return parseString("occupation", occupation);
};

const parseSsn = (ssn: unknown): string => {
    return parseString("ssn", ssn);
};

const parseString = (fieldName: string, data: unknown): string => {
    if (!isString(data)) {
        throw new Error(`${fieldName} should be string`);
    }

    return data;
};

const isGender = (gender: string): gender is Gender => {
    return Object.values(Gender).map(g => g.toString()).includes(gender);
};