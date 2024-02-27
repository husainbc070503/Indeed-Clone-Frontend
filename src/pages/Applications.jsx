import { Box, Container, Grid, Typography } from "@mui/material";
import React from "react";
import { useGlobalContext } from "../contexts/AppContext";
import ApplicationCard from "../components/ApplicationCard";

const Applications = ({ fromRecruiter }) => {
  const { user, applications } = useGlobalContext();
  const myApplications = applications?.filter(
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
          {!fromRecruiter && "My"} applications
        </Typography>
        <Grid container justifyContent="space-between" spacing={2}>
          {(!fromRecruiter ? myApplications : applications)?.length > 0 ? (
            (!fromRecruiter ? myApplications : applications)?.map((item) => (
              <ApplicationCard
                item={item}
                key={item?._id}
                fromRecruiter={fromRecruiter}
              />
            ))
          ) : (
            <Typography fontSize={20} mx={2} mt={1}>
              {!fromRecruiter
                ? "No application to any job."
                : "No one applied to you job opening"}
            </Typography>
          )}
        </Grid>
      </Box>
    </Container>
  );
};

export default Applications;
