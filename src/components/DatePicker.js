import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import moment from "moment";
import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
function DatePicker(props) {
  const { onChange } = props;
  const [value, setValue] = useState(moment());
  const handleChange = (newValue) => {
    setValue(newValue);
    props.onChange(newValue.format("DD/MM/YYYY"));
  };

  useEffect(() => {
    onChange(value.toDate());
  }, []);
  return (
    <LocalizationProvider dateAdapter={props.DateAdapter}>
      <DesktopDatePicker
        label={props.label}
        inputFormat="DD/MM/YYYY"
        value={value}
        onChange={handleChange}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}

export default DatePicker;
