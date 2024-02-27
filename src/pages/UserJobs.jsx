import React, { useState } from "react";
import { useGlobalContext } from "../contexts/AppContext";
import { Box, Container, Grid, Typography } from "@mui/material";
import SearchBox from "../components/SearchBox";
import JobCard from "../components/JobCard";

const UserJobs = () => {
  const { jobs, bookmarks } = useGlobalContext();
  const [search, setSearch] = useState("");

  const unbookedJobs = jobs?.filter(
    (item) => !bookmarks?.find((e) => e?._id === item?._id)
  );

  return (
    <Container maxWidth="lg" className="container">
      <Box>
        <Grid
          container
          justifyContent="space between"
          mb={2}
          alignItems="center"
        >
          <Grid item md={6} xs={12}>
            <Typography
              fontSize={34}
              fontWeight="bold"
              color="primary"
              mb={2}
              textTransform="capitalize"
            >
              Jobs posted by the recruiters
            </Typography>
          </Grid>
          <Grid item md={6} xs={12}>
            <SearchBox
              title="Job Name"
              search={search}
              handleChange={(e) => setSearch(e.target.value.toLowerCase())}
            />
          </Grid>
        </Grid>
        <Grid
          container
          alignItems="flex-start"
          columnSpacing={2}
          rowSpacing={2}
        >
          {unbookedJobs
            ?.filter((item) => item?.title?.toLowerCase().includes(search))
            ?.map((item, ind) => (
              <JobCard item={item} key={ind} fromUser={true} />
            ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default UserJobs;
