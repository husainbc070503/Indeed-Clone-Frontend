import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Logo from "../assets/indeed-logo.png";
import Flower from "../assets/flower.png";
import { NavLink } from "react-router-dom";
import { useGlobalContext } from "../contexts/AppContext";
import { Avatar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const Navbar = () => {
  const { user, handleLogout } = useGlobalContext();
  const [openNav, setOpenNav] = React.useState(false);

  return (
    <Box>
      <AppBar position="fixed" className="AppBar bar">
        <Toolbar>
          <div className="logo">
            <img src={Logo} alt="logo" />
            <img src={Flower} alt="flower" />
          </div>
          <div className="nav-icon">
            {!openNav ? (
              <MenuIcon onClick={() => setOpenNav(!openNav)} />
            ) : (
              <CloseIcon onClick={() => setOpenNav(!openNav)} />
            )}
          </div>
          <div className={`lists ${openNav && "open-lists"}`}>
            <NavLink to="/" className="nav-link">
              Home
            </NavLink>
            {user?.user && (
              <>
                {user?.user?.role === "recruiter" ? (
                  <>
                    <NavLink to="postJob" className="nav-link">
                      Post a Job
                    </NavLink>
                    <NavLink to="applications" className="nav-link">
                      Applications
                    </NavLink>
                    <NavLink to="companies" className="nav-link">
                      Companies
                    </NavLink>
                  </>
                ) : (
                  <>
                    <NavLink to="myApplications" className="nav-link">
                      Applied Jobs
                    </NavLink>
                    <NavLink to="myBookmarks" className="nav-link">
                      Bookmarks
                    </NavLink>
                  </>
                )}
                <NavLink className="nav-link" to="myProfile">
                  Profile
                </NavLink>
                <Typography
                  fontSize={20}
                  marginX="1.5rem"
                  onClick={handleLogout}
                  display="inline-block"
                  className="Typography logout"
                >
                  Logout
                </Typography>
              </>
            )}
          </div>
          {!user?.user ? (
            <NavLink to="auth">
              <Button color="secondary" variant="contained">
                Login
              </Button>
            </NavLink>
          ) : (
            <Avatar src={user?.user?.profilePic} alt={user?.user?.name} />
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
