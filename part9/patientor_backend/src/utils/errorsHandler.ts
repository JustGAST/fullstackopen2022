import {Response} from "express-serve-static-core";

export const handleError = (res: Response, error: unknown) => {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
        errorMessage += " " + error.message;
    }
    res.status(400).json({
        error: errorMessage,
    });
};