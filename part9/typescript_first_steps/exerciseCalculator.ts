import {exercisesCalculator} from "./exercisesCalculator";

const parseExerciseArgs = (args: string[]): { hours: number[], target: number } =>  {
    if (args.length < 3) {
        throw new Error("Provide exercise hours by days");
    }

    const argsNumbers: number[] = args.slice(2).map(arg => {
        const argNumber = Number(arg);
        if (isNaN(argNumber)) {
            throw new Error("Arguments should be numbers");
        }
        if (argNumber > 24) {
            throw new Error("Specify hours of day, not more");
        }

        return argNumber;
    });

    return {hours: argsNumbers.slice(1), target: argsNumbers[0]};
};

const exerciseArgs = parseExerciseArgs(process.argv);
console.log(exercisesCalculator(exerciseArgs.hours, exerciseArgs.target));