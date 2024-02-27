import { Grid, Typography } from "@mui/material";
import React from "react";

const ProfileText = ({ title, text }) => {
  return (
    <Grid container spacing={2} alignItems="center" mb={3}>
      <Grid item md={2} xs={2}>
        <Typography fontSize={25} fontWeight="bold">
          {title}
        </Typography>
      </Grid>
      <Grid item md={10} xs={10}>
        <Typography fontSize={24}>{text}</Typography>
      </Grid>
    </Grid>
  );
};

export default ProfileText;
