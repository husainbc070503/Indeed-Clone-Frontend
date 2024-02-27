import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import React from "react";

const SelectField = ({
  value,
  onChange,
  title,
  name,
  type,
  arr,
  fromJobPost,
}) => {
  return (
    <div className="mb-4">
      <Typography fontSize={18} mb={0.8}>
        {title}
      </Typography>
      <FormControl fullWidth>
        <InputLabel id="type-select">{type}</InputLabel>
        <Select
          labelId="type-select"
          id="type-select"
          label={type}
          value={value}
          onChange={onChange}
          name={name}
          className="Select select-type"
        >
          {arr.map((item, ind) => (
            <MenuItem
              value={fromJobPost ? item._id : item}
              key={ind}
              className="MenuItem select-type"
            >
              {fromJobPost ? item.name : item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default SelectField;
