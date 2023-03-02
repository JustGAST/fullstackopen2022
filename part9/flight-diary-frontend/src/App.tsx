import React, {useEffect, useState} from 'react';
import Diaries from "./components/Diaries";
import {DiaryEntry} from "./types";
import diaryService from "./services/diaryService"
import DiaryForm from "./components/DiaryForm";

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    diaryService.getAll().then(diaries => setDiaries(diaries))
  }, [])


  return (
    <div className="App">
    <DiaryForm />
      <h2>Diary entries</h2>
      <Diaries diaries={diaries} />
    </div>
  );
}

export default App;
