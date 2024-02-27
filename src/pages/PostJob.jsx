import { Box, Button, Container, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import TextFieldInput from "../components/TextField";
import SelectField from "../components/SelectField";
import { useGlobalContext } from "../contexts/AppContext";
import RadioField from "../components/RadioField";
import SelectMultiple from "../components/SelectMultiple";
import { useParams } from "react-router-dom";

const initialState = {
  title: "",
  description: "",
  salary: 0,
  company: "",
  joiningDate: "",
  experience: 0,
  skillsRequired: "",
  jobTypes: [],
  responsibilities: "",
  educationEligibility: "",
};

const PostJob = () => {
  const { companies, postJob, jobs, editJob } = useGlobalContext();
  const [jobDetails, setJobDetails] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  const handleChange = (e) =>
    setJobDetails({ ...jobDetails, [e.target.name]: e.target.value });

  const filteredCompanies = companies?.map((item) => {
    return {
      _id: item?._id,
      name: item?.name,
    };
  });

  const handleSubmit = () => {
    var skills = jobDetails.skillsRequired.split(", ");
    !id
      ? postJob(jobDetails, skills, setJobDetails, setLoading, initialState)
      : editJob(id, skills, jobDetails, setLoading);
  };

  const resetForm = () => setJobDetails(initialState);

  useEffect(() => {
    if (id) {
      const job = jobs?.filter((item) => item?._id === id)[0];
      const skills = job?.skillsRequired?.join(", ");
      setJobDetails({ ...job, skillsRequired: skills });
    } else setJobDetails(initialState);
  }, [id]);

  return (
    <Container maxWidth="md" className="container">
      <Box>
        <Typography
          fontSize={30}
          textTransform="capitalize"
          color="primary"
          mb={1.5}
        >
          {id ? "Edit job post" : "Post Job Opening"}
        </Typography>
        <TextFieldInput
          type="text"
          title="Title"
          others="title"
          value={jobDetails.title}
          onChange={handleChange}
        />
        <TextFieldInput
          type="text"
          title="Description"
          others="description"
          value={jobDetails.description}
          onChange={handleChange}
          multiline={true}
          rows={6}
        />
        <SelectField
          title="Company"
          value={jobDetails.company}
          onChange={handleChange}
          type="Select"
          name="company"
          arr={filteredCompanies}
          fromJobPost={true}
        />
        <TextFieldInput
          type="number"
          title="Salary"
          text="Per Annum"
          others="salary"
          value={jobDetails.salary}
          onChange={handleChange}
        />
        <TextFieldInput
          title="Skills Required"
          text="Add comma between two skills (e.g. HTML, CSS, ...)"
          type="text"
          others="skillsRequired"
          value={jobDetails.skillsRequired}
          onChange={handleChange}
        />
        <TextFieldInput
          type="number"
          title="Experience"
          text="In years"
          others="experience"
          value={jobDetails.experience}
          onChange={handleChange}
        />
        <SelectMultiple
          jobDetails={jobDetails}
          setJobDetails={setJobDetails}
          title="Job Types"
        />
        <TextFieldInput
          type="text"
          title="Reponsibilities"
          others="responsibilities"
          value={jobDetails.responsibilities}
          onChange={handleChange}
          multiline={true}
          rows={6}
        />
        <TextFieldInput
          type="text"
          title="Education Eligibility"
          others="educationEligibility"
          value={jobDetails.educationEligibility}
          onChange={handleChange}
          multiline={true}
          rows={2}
        />
        <TextFieldInput
          type="date"
          title="Joining Date"
          others="joiningDate"
          value={jobDetails.joiningDate}
          onChange={handleChange}
        />
        <Button
          variant="contained"
          color="success"
          disabled={loading}
          onClick={handleSubmit}
        >
          {id ? "update" : "post"}
        </Button>
        <Button
          type="reset"
          color="error"
          variant="contained"
          className="ms-2"
          onClick={resetForm}
        >
          Reset
        </Button>
      </Box>
    </Container>
  );
};

export default PostJob;
