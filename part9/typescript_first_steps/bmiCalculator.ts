import {calculateBmi} from "./calculateBmi";

interface BmiParams {
    weight: number,
    height: number,
}
const parseArgs = (args: string[]): BmiParams => {
    if (args.length > 4) {
        throw new Error("Too many params")
    }
    if (args.length < 4) {
        throw new Error("Too few params")
    }

    const weight = Number(args[3]);
    const height = Number(args[2]);
    if (isNaN(weight) || isNaN(height)) {
        throw new Error("Params should be numbers")
    }

    return {weight, height};
}

const args = parseArgs(process.argv)
console.log(calculateBmi(args.weight, args.height))