export const isString = (text: unknown): text is string => {
    return typeof text == 'string' || text instanceof String;
};

export const isDate = (date: unknown): date is string => {
    return isString(date) && !isNaN(Date.parse(date));
};