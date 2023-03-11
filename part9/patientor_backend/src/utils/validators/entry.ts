import {
  assertNever,
  BaseEntryWithoutId,
  Diagnose,
  Discharge,
  EntryType,
  EntryWithoutId,
  HealthCheckRating,
  OccupationalHealthcareEntry,
  SickLeave
} from "../../types";
import {isNumber, isString, parseString} from "./common";

export const toNewEntry = (data: unknown): EntryWithoutId => {
  if (typeof data !== 'object' || data == null || !('type' in data)) {
    throw new Error("data should be non-empty object");
  }

  const entryType = parseEntryType(data.type);
  switch (entryType) {
    case EntryType.HealthCheck:
      return toHealthCheckEntry(data);
    case EntryType.OccupationalHealthcare:
      return toOccupationalHealthcareEntry(data);
    case EntryType.Hospital:
      return toHospitalEntry(data);
    default:
      assertNever(entryType);
  }

  throw new Error(`wrong entry type: ${data.type}`);
};

const toHealthCheckEntry = (data: object): EntryWithoutId => {
  const baseEntry = parseBaseEntry(data);

  if (!('healthCheckRating' in data && isNumber(data.healthCheckRating) && isHealthCheckRating(data.healthCheckRating))) {
    throw new Error('specify healthcheck rating');
  }

  return {
    ...baseEntry,
    type: EntryType.HealthCheck,
    healthCheckRating: data.healthCheckRating
  };
};

const toOccupationalHealthcareEntry = (data: object): EntryWithoutId => {
  const baseEntry = parseBaseEntry(data);

  if (!('employerName' in data && isString(data.employerName))) {
    throw new Error('employer name should be set');
  }

  const entry: Omit<OccupationalHealthcareEntry, 'id'> = {
    ...baseEntry,
    type: EntryType.OccupationalHealthcare,
    employerName: data.employerName,
  };

  if ('sickLeave' in data && isSickLeave(data.sickLeave)) {
    entry.sickLeave = data.sickLeave;
  }

  return entry;
};

const toHospitalEntry = (data: object): EntryWithoutId => {
  const baseEntry = parseBaseEntry(data);

  if (!('discharge' in data && isDischarge(data.discharge))) {
    throw new Error('discharge should be set');
  }

  return {
    ...baseEntry,
    type: EntryType.Hospital,
    discharge: data.discharge,
  };
};

const parseBaseEntry = (data: object): BaseEntryWithoutId => {
  if (!('description' in data && 'date' in data && 'specialist' in data
    && 'type' in data)) {
    throw new Error("missing essential data");
  }

  if (!data.date) {
    throw new Error('date should be set');
  }
  if (!data.specialist) {
    throw new Error('specialist should be set');
  }

  return {
    description: parseString('description', data.description),
    date: parseString('date', data.date),
    specialist: parseString('specialist', data.specialist),
    type: parseEntryType(data.type),
    diagnosisCodes: 'diagnosisCodes' in data ? parseDiagnosisCodes(data.diagnosisCodes) : undefined,
  };
};

const parseDiagnosisCodes = (diagnosisCodes: unknown): Array<Diagnose['code']> => {
  if (!isDiagnosisCodes(diagnosisCodes)) {
    return [];
  }

  return diagnosisCodes;
};

const parseEntryType = (entryType: unknown): EntryType => {
  if (!isString(entryType) || !isEntryType(entryType)) {
    throw new Error('wrong entry type');
  }

  return entryType;
};

const isEntryType = (entryType: string): entryType is EntryType => {
  return Object.values(EntryType).map(t => t.toString()).includes(entryType);
};

const isDiagnosisCodes = (codes: unknown): codes is Array<Diagnose['code']> => {
  if (!codes || !Array.isArray(codes)) {
    return false;
  }

  for (const diagnosisCode of codes) {
    if (!isDiagnosisCode(diagnosisCode)) {
      throw new Error(`wrong diagnoses code: ${diagnosisCode}`);
    }
  }

  return true;
};

const isDiagnosisCode = (item: unknown): item is Diagnose['code'] => {
  return isString(item);
};

const isHealthCheckRating = (rating: number): rating is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(rating);
};

const isSickLeave = (sickLeave: unknown): sickLeave is SickLeave => {
  return sickLeave != null
    && typeof sickLeave === 'object'
    && 'startDate' in sickLeave
    && 'endDate' in sickLeave
    && isString(sickLeave.startDate)
    && isString(sickLeave.endDate);
};

const isDischarge = (discharge: unknown): discharge is Discharge => {
  return discharge != null
    && typeof discharge === 'object'
    && 'date' in discharge
    && 'criteria' in discharge
    && isString(discharge.date)
    && isString(discharge.criteria);
};