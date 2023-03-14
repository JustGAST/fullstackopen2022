import React from 'react'
import ReactDOM from 'react-dom/client'
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";

import App from './App'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <App/>
  </LocalizationProvider>
)