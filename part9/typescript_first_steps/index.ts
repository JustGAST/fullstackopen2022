import express from "express";

import {calculateBmi} from "./calculateBmi";
import bodyParser from "body-parser";
import {exercisesCalculator} from "./exercisesCalculator";

const app = express();
app.use(bodyParser.json());

app.get('/ping', (_req, res) => {
    res.send("pong");
});

app.get('/hello', (_req, res) => {
    res.send("Hello Full Stack!");
});

app.get('/bmi', (req, res) => {
    if (!(Object.prototype.hasOwnProperty.call(req.query, 'weight')
        && Object.prototype.hasOwnProperty.call(req.query, 'height'))) {
        res.status(400).json({
            error: "Specify weight and height parameters"
        });
        return;
    }

    const {weight, height} = req.query;

    if (isNaN(Number(weight)) || isNaN(Number(height))) {
        res.status(400).json({
            error: "Weight and height should be numbers"
        });
        return;
    }

    const validatedWeight = Number(weight);
    const validatedHeight = Number(height);

    const bmi = calculateBmi(validatedWeight, validatedHeight);

    res.json({
        result: bmi
    });
});

app.post('/exercises', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const {daily_exercises, target} = req.body;

    if (!(daily_exercises && target)) {
        res.status(400).json({
            error: "specify exercises and target"
        });
        return;
    }

    if (!Array.isArray(daily_exercises)) {
        res.status(400).json({
            error: "exercises should be array of numbers"
        });
        return;
    }

    let error = false;
    const exercisesNumbersArray = daily_exercises.map(hours => {
        const hoursNumber = Number(hours);
        if (isNaN(hoursNumber)) {
            error = true;
        }

        return hoursNumber;
    });

    const targetNumber = Number(target);

    if (error || isNaN(targetNumber)) {
        res.status(400).json({
            error: "exercises should be array of numbers, target should be number"
        });
        return;
    }

    res.json(exercisesCalculator(exercisesNumbersArray, targetNumber));
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});