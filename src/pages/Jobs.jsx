import { Box, Container, Grid, Typography } from "@mui/material";
import React from "react";
import { useGlobalContext } from "../contexts/AppContext";
import JobCard from "../components/JobCard";

const Jobs = () => {
  const { user, jobs } = useGlobalContext();
  const filteredJobs = jobs?.filter(
    (item) => item?.user?._id === user?.user?._id
  );

  return (
    <Container maxWidth="lg" className="container">
      <Box>
        <Typography
          fontSize={34}
          fontWeight="bold"
          color="primary"
          mb={2}
          textTransform="capitalize"
        >
          Jobs posted by me
        </Typography>
        <Grid
          container
          alignItems="flex-start"
          columnSpacing={2}
          rowSpacing={2}
        >
          {filteredJobs?.length > 0 ? (
            filteredJobs?.map((item, ind) => <JobCard item={item} key={ind} />)
          ) : (
            <Typography fontSize={20} mx={2} mt={1}>
              No job added.
            </Typography>
          )}
        </Grid>
      </Box>
    </Container>
  );
};

export default Jobs;
