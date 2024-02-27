import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { Typography } from "@mui/material";

const RadioField = ({ value, onChange, arr, title }) => {
  return (
    <FormControl className="mb-4">
      <Typography fontSize={18}>{title}</Typography>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="role"
        value={value}
        onChange={onChange}
      >
        {arr.map((item, index) => (
          <FormControlLabel
            key={index}
            value={item.toLowerCase()}
            control={<Radio />}
            label={item}
            name="role"
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default RadioField;
