import express from "express";

import {calculateBmi} from "./calculateBmi";

const app = express();

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

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});