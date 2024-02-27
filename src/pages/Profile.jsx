import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../contexts/AppContext";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import ProfileText from "../components/ProfileText";
import EditIcon from "@mui/icons-material/Edit";
import TextFieldInput from "../components/TextField";
import { toast } from "react-toastify";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import RadioField from "../components/RadioField";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user, updateProfile } = useGlobalContext();
  const [updateUser, setUpdateUser] = useState({});
  const [update, setUpdate] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setUpdateUser({ ...updateUser, [e.target.name]: e.target.value });

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

        setUpdateUser({ ...updateUser, profilePic: resp.url });
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
      const data = await updateProfile(updateUser);
      if (data.success) {
        toast.success("Profile updated", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
        });

        setUpdate(false);
        setUpdateUser({});
        localStorage.setItem(
          "indeed-clone-user",
          JSON.stringify({ token: user?.token, user: data?.user })
        );
        navigate("/");
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

  useEffect(() => {
    setUpdateUser(user?.user);
  }, [user, update]);

  return (
    <Container className="container" maxWidth="lg">
      <Box>
        <Typography
          textAlign="center"
          fontSize={42}
          marginBottom={4}
          color="primary"
        >
          My Profile
        </Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid item md={6} xs={12} textAlign="center">
            <div className="profile-pic">
              <img src={updateUser?.profilePic} alt={user?.user?.name} />
              {update && (
                <>
                  <label htmlFor="update">
                    <EditIcon className="fs-5" />
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    id="update"
                    style={{ display: "none" }}
                    onChange={(e) => handleUpload(e.target.files[0])}
                  />
                </>
              )}
            </div>
          </Grid>
          <Grid item md={6} xs={12}>
            {!update ? (
              <>
                <ProfileText title="Name" text={user?.user?.name} />
                <ProfileText title="Email" text={user?.user?.email} />
                <ProfileText
                  title="Role"
                  text={
                    user?.user?.role[0].toUpperCase() +
                    user?.user?.role.substring(1)
                  }
                />
                <Button
                  color="secondary"
                  variant="contained"
                  onClick={() => setUpdate(true)}
                >
                  Update Profile
                </Button>
              </>
            ) : (
              <>
                <TextFieldInput
                  title="Name"
                  type="text"
                  others="name"
                  value={updateUser?.name}
                  onChange={handleChange}
                  icon={<PersonIcon className="fs-5" />}
                />
                <TextFieldInput
                  title="Email"
                  type="email"
                  others="email"
                  value={updateUser?.email}
                  onChange={handleChange}
                  icon={<EmailIcon className="fs-5" />}
                />
                {/* <RadioField
                  arr={["Recruiter", "Job Seeker"]}
                  title="Role"
                  value={updateUser?.role}
                  onChange={handleChange}
                /> */}
                <Button
                  color="success"
                  variant="contained"
                  className="d-block"
                  disabled={loading}
                  onClick={handleSubmit}
                >
                  Update
                </Button>
              </>
            )}
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Profile;
