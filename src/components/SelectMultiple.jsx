import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { Typography } from "@mui/material";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const jobTypes = [
  "Internship",
  "Full-Time",
  "Part-Time",
  "Fresher",
  "Contract",
  "Temporary",
  "Permanent",
  "Day-Shift",
];

function getStyles(type, jobType, theme) {
  return {
    fontWeight:
      jobType.indexOf(type) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const SelectMultiple = ({ setJobDetails, jobDetails, title }) => {
  const theme = useTheme();
  const [jobType, setJobType] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setJobType(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
    setJobDetails({
      ...jobDetails,
      jobTypes: [...new Set(jobDetails.jobType), ...value],
    });
  };

  return (
    <div className="mb-4">
      <Typography fontSize={18} mb={0.8}>
        {title}
      </Typography>
      <FormControl fullWidth>
        <InputLabel id="job-type">Multi Select</InputLabel>
        <Select
          labelId="job-type"
          id="job-type"
          multiple
          value={jobType}
          onChange={handleChange}
          input={
            <OutlinedInput id="select-multiple-chip" label="Multi Select" />
          }
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {jobTypes.map((type) => (
            <MenuItem
              key={type}
              value={type}
              style={getStyles(type, jobType, theme)}
            >
              {type}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default SelectMultiple;
