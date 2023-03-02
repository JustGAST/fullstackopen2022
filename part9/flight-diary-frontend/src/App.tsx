import React, {useEffect, useState} from 'react';
import Diaries from "./components/Diaries";
import {DiaryEntry} from "./types";
import diaryService from "./services/diaryService"

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    diaryService.getAll().then(diaries => setDiaries(diaries))
  }, [])


  return (
    <div className="App">
      <h1>Diary entries</h1>
      <Diaries diaries={diaries} />
    </div>
  );
}

export default App;
