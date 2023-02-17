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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))