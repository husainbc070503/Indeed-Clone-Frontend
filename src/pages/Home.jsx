import { Button, Container, Grid, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import Hire from "../assets/home-img.png";
import { useGlobalContext } from "../contexts/AppContext";
import Jobs from "./Jobs";
import UserJobs from "./UserJobs";

const Home = () => {
  const { user } = useGlobalContext();

  return !user?.user ? (
    <Container maxWidth="lg" className="container home-container">
      <Grid
        container
        spacing={2}
        alignItems="center"
        justifyContent="space-betweeen"
      >
        <Grid item md={6} xs={12}>
          <Typography
            fontSize={90}
            mb={5}
            lineHeight={1.2}
            textTransform="capitalize"
          >
            Let's make you get hired
          </Typography>
          <Link className="link" to="../auth">
            <Button variant="contained">
              <Typography fontSize={24} textTransform="capitalize">
                Get Started
              </Typography>
            </Button>
          </Link>
        </Grid>
        <Grid item md={6} xs={12}>
          <img src={Hire} alt="hire-image" />
        </Grid>
      </Grid>
    </Container>
  ) : user?.user?.role === "recruiter" ? (
    <Jobs />
  ) : (
    <UserJobs />
  );
};

export default Home;
