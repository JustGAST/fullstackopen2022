import axios from 'axios'
import {DiaryEntry} from "../types";

const baseUrl = 'http://localhost:3001/api/diaries';

const getAll = () => {
    return axios
        .get<DiaryEntry[]>(baseUrl)
        .then(response => response.data)
}

const diaryService = {
    getAll
}

export default diaryService;