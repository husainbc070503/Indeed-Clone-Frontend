import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import TextFieldInput from "../components/TextField";
import SelectField from "../components/SelectField";
import { useGlobalContext } from "../contexts/AppContext";
import CompanyTable from "../components/CompanyTable";

const initialState = {
  name: "",
  description: "",
  type: "",
  address: "",
  strength: 0,
};

const Companies = () => {
  const { addCompany, editCompany } = useGlobalContext();
  const [details, setDetails] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);

  const handleChange = (e) =>
    setDetails({ ...details, [e.target.name]: e.target.value });

  const handleClick = (comp) => {
    setDetails(comp);
    setEditing(true);
  };

  return (
    <Container maxWidth="xl" className="container">
      <Box>
        <Grid container spacing={2}>
          <Grid item md={4} xs={12}>
            <Typography fontSize={28} mb={1} color="primary">
              {editing ? "Edit" : "Add"} Company Details
            </Typography>
            <TextFieldInput
              title="Name"
              type="text"
              others="name"
              value={details.name}
              onChange={handleChange}
            />
            <TextFieldInput
              title="About"
              type="text"
              multiline={true}
              rows={4}
              others="description"
              value={details.description}
              onChange={handleChange}
            />
            <SelectField
              title="Type"
              value={details.type}
              name="type"
              onChange={handleChange}
              arr={["software development", "product based", "service based"]}
              type="Select"
            />
            <TextFieldInput
              title="Strength (No. of employees)"
              type="number"
              others="strength"
              value={details.strength}
              onChange={handleChange}
            />
            <TextFieldInput
              title="Address"
              type="text"
              multiline={true}
              rows={4}
              others="address"
              value={details.address}
              onChange={handleChange}
            />
            <Button
              variant="contained"
              disabled={loading}
              onClick={() =>
                !editing
                  ? addCompany(details, setLoading, initialState, setDetails)
                  : editCompany(
                      details,
                      setLoading,
                      setEditing,
                      setDetails,
                      initialState,
                      details?._id
                    )
              }
            >
              {editing ? "Update" : "Add"}
            </Button>
          </Grid>
          <Grid item md={8} xs={12}>
            <Typography fontSize={28} mb={1} color="primary">
              Companies
            </Typography>
            <CompanyTable handleClick={handleClick} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Companies;
