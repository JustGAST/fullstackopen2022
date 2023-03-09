export const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

export const isNumber = (number: unknown): number is number => {
    return typeof number === 'number';
};

export const isDate = (date: unknown): date is string => {
    return isString(date) && !isNaN(Date.parse(date));
};

export const parseString = (fieldName: string, data: unknown): string => {
    if (!isString(data)) {
        throw new Error(`${fieldName} should be string`);
    }

    return data;
};