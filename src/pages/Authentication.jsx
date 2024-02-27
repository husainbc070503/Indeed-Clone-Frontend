import { Box, Button, Container, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import Logo from "../assets/indeed-auth-logo.png";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import TextFieldInput from "../components/TextField";
import PasswordField from "../components/PasswordField";
import { toast } from "react-toastify";
import { useGlobalContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";
import RadioField from "../components/RadioField";
import ForgotPassword from "../components/ForgotPassword";

const initialState = {
  name: "",
  email: "",
  password: "",
  cpassword: "",
  profilePic: "",
  role: "",
};

const Authentication = () => {
  const [openReg, setOpenReg] = useState(false);
  const [details, setDetails] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const { registerUser, loginUser } = useGlobalContext();
  const navigate = useNavigate();

  const handleChange = (e) =>
    setDetails({ ...details, [e.target.name]: e.target.value });

  const handleUpload = async (file) => {
    setLoading(true);

    if (file === undefined) {
      setLoading(false);
      return toast.error("Please upload your profile pic.", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    }

    if (file.type !== "image/png" && file.type !== "image/jpeg") {
      setLoading(false);
      return toast.error("JPEG/PNG images are accepted.", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    }

    try {
      const url = "https://api.cloudinary.com/v1_1/dm7x7knbb/image/upload";
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "indeed-clone");
      data.append("class", "dm7x7knbb");

      const res = await fetch(url, {
        method: "POST",
        body: data,
      });

      const resp = await res.json();
      if (!resp.error) {
        toast.success("Profile pic uploaded successfully.", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
        });

        setDetails({ ...details, profilePic: resp.url });
      } else {
        toast.error(resp.error.message, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
        });
      }
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (openReg) {
        if (details.password !== details.cpassword) {
          return toast.error("Mismatch Password", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "light",
          });
        }

        const data = await registerUser(details);
        if (data.success) {
          toast.success("Successfully Registered", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "light",
          });

          setDetails(initialState);
          setOpenReg(false);
        } else {
          toast.error(data.message, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "light",
          });
        }
      } else {
        const data = await loginUser(details);
        if (data.success) {
          toast.success("Successfully Loggedin", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "light",
          });

          setDetails(initialState);
          localStorage.setItem("indeed-clone-user", JSON.stringify(data.user));
          navigate("/");
        } else {
          toast.error(data.message, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "light",
          });
        }
      }
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg" className="container">
      <Box>
        <div className="auth-img">
          <img src={Logo} alt="logo" />
        </div>
        <div className="bg-light w-50 mx-auto rounded-2 p-3 auth-form">
          {openReg && (
            <TextFieldInput
              title="Name"
              type="text"
              others="name"
              value={details.name}
              onChange={handleChange}
              icon={<PersonIcon className="fs-5" />}
            />
          )}
          <TextFieldInput
            title="Email"
            type="email"
            others="email"
            value={details.email}
            onChange={handleChange}
            icon={<EmailIcon className="fs-5" />}
          />
          <PasswordField
            others="password"
            title="Password"
            value={details.password}
            onChange={handleChange}
          />
          {openReg && (
            <>
              <PasswordField
                others="cpassword"
                title="Repeat Password"
                value={details.cpassword}
                onChange={handleChange}
              />
              <RadioField
                title="Role"
                value={details.role}
                onChange={handleChange}
                arr={["Recruiter", "Job Seeker"]}
              />
              <TextFieldInput
                title="Profile Picture"
                type="file"
                others="profile Pic"
                onChange={(e) => handleUpload(e.target.files[0])}
              />
            </>
          )}
          <Button
            variant="contained"
            className="w-100"
            disabled={loading}
            onClick={handleSubmit}
          >
            {openReg ? "Register" : "Login"}
          </Button>
          <Grid container mt={3}>
            <Grid item md={6} xs={6}>
              {!openReg && <ForgotPassword />}
            </Grid>
            <Grid item md={6} xs={6} textAlign="end">
              <Typography
                fontSize={18}
                color="GrayText"
                onClick={() => setOpenReg(!openReg)}
                sx={{ cursor: "pointer" }}
              >
                {openReg ? "Account already exists?" : "Don't have an account?"}
              </Typography>
            </Grid>
          </Grid>
        </div>
      </Box>
    </Container>
  );
};

export default Authentication;
