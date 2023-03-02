import axios from 'axios'
import {DiaryEntry, NewDiaryEntry} from "../types";

const baseUrl = 'http://localhost:3001/api/diaries';

const getAll = () => {
    return axios
        .get<DiaryEntry[]>(baseUrl)
        .then(response => response.data);
}

const add = (newEntry: NewDiaryEntry) => {
    return axios
        .post<DiaryEntry>(baseUrl, newEntry)
        .then(response => response.data);
}

const diaryService = {
    getAll, add
}

export default diaryService;