interface Result {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number,
}

const calculateExercises = (hours: number[], target: number): Result => {
    const averageTrainingHours = hours.reduce((sum, h) => sum + h, 0) / hours.length;

    let rating: number;
    let ratingDescription: string;
    const difference = target - averageTrainingHours;
    switch (true) {
        case difference < 0:
            rating = 3;
            ratingDescription = 'Excellent';
            break;
        case difference >= 0 && difference < 0.3:
            rating = 2;
            ratingDescription = 'Good';
            break
        case difference >= 0.3:
            rating = 1;
            ratingDescription = 'Not bad';
    }

    return {
        periodLength: hours.length,
        trainingDays: hours.filter(Boolean).length,
        target,
        success: averageTrainingHours >= target,
        average: averageTrainingHours,
        rating,
        ratingDescription
    }
}

const parseExerciseArgs = (args: string[]): { hours: number[], target: number } =>  {
    if (args.length < 3) {
        throw new Error("Provide exercise hours by days")
    }

    const argsNumbers: number[] = args.slice(2).map(arg => {
        const argNumber = Number(arg)
        if (isNaN(argNumber)) {
            throw new Error("Arguments should be numbers");
        }
        if (argNumber > 24) {
            throw new Error("Specify hours of day, not more")
        }

        return argNumber;
    })

    return {hours: argsNumbers.slice(1), target: argsNumbers[0]}
}

const exerciseArgs = parseExerciseArgs(process.argv)
console.log(calculateExercises(exerciseArgs.hours, exerciseArgs.target))