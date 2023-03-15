import React from "react";
import {PickerChangeHandler} from "@mui/x-date-pickers/internals/hooks/usePicker/usePickerValue";
import {DatePicker as DatePickerMUI, DateValidationError} from "@mui/x-date-pickers";
import dayjs from "dayjs";

interface Props {
  label: string;
  value: string;
  onChange: (newDate: string) => void;
}

const DatePicker = ({label, value, onChange}: Props) => {
  const onChangeDateLocal: PickerChangeHandler<dayjs.Dayjs | null, DateValidationError> = (newDate) => {
    if (newDate == null) {
      console.log('no new date from datepicker');
      return;
    }

    onChange(newDate.format('YYYY-MM-DD'));
  }

  return (
    <DatePickerMUI label={label} value={dayjs(value)} onChange={onChangeDateLocal}/>
  )
}

export default DatePicker;