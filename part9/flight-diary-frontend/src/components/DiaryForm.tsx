import React, {ChangeEvent, SyntheticEvent, useState} from "react";
import axios from "axios";

import {NewDiaryEntry, Visibility, Weather} from "../types";
import diaryService from "../services/diaryService";

const DiaryForm = () => {
    const initialState = {
        date: '',
        comment: '',
        visibility: '',
        weather: '',
    };

    const [newDiary, setNewDiary] = useState<NewDiaryEntry>(initialState)
    const [error, setError] = useState('');

    const weatherOptions = Object.values(Weather).map(w => w.toString());
    const visibilityOptions = Object.values(Visibility).map(v => v.toString());

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault()
        diaryService.add(newDiary)
            .then(() => {
                setNewDiary(initialState)
            })
            .catch(e => {
                if (axios.isAxiosError(e) && e.response) {
                    setError(e.response.data);
                    return;
                }
                console.log(e)
            });

    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNewDiary({...newDiary, [e.target.name]: e.target.value})
    }

    return (
        <>
            <h2>Add new entry</h2>
            {error && <div style={{color: "red", marginBottom: '20px'}}>{error}</div>}

            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        date:
                        <input name='date' value={newDiary.date} onChange={handleChange} type='date'/>
                    </label>
                </div>
                <div>
                        visibility:{' '}
                        {visibilityOptions.map(visibility => (
                            <label key={visibility}>
                                <input name='visibility' value={visibility} onChange={handleChange} type="radio"/>
                                {visibility}{' '}
                            </label>
                        ))}
                </div>
                <div>
                    <label>
                        weather:{' '}
                        {weatherOptions.map(weather => (
                            <span key={weather}>
                                <input name='weather' value={weather} onChange={handleChange} type="radio"/>
                                {weather}{' '}
                            </span>
                        ))}
                    </label>
                </div>
                <div>
                    <label>
                        comment:
                        <input name='comment' value={newDiary.comment} onChange={handleChange} type='text'/>
                    </label>
                </div>
                <div>
                    <button type='submit'>Save</button>
                </div>
            </form>
        </>
    );
}

export default DiaryForm;