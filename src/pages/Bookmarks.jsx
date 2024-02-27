import { Box, Container, Grid, Typography } from "@mui/material";
import React from "react";
import { useGlobalContext } from "../contexts/AppContext";
import JobCard from "../components/JobCard";

const Bookmarks = () => {
  const { bookmarks } = useGlobalContext();

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
          Jobs bookmarked
        </Typography>
        <Grid container spacing={2}>
          {bookmarks?.length > 0 ? (
            bookmarks?.map((item) => (
              <JobCard item={item} alreadyBookmarked={true} fromUser={true} />
            ))
          ) : (
            <Typography fontSize={20} mx={2} mt={1}>
              No bookmarked jobs.
            </Typography>
          )}
        </Grid>
      </Box>
    </Container>
  );
};

export default Bookmarks;
