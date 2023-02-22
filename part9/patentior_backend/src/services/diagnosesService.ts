import diagnoses from '../../data/diagnoses';

export type Diagnose = {
    code: string,
    name: string,
    latin?: string
};

const getDiagnoses = (): Diagnose[] => {
    return diagnoses;
};

const addDiagnose = () => {
    return null;
};

export default {
    getDiagnoses,
    addDiagnose
};