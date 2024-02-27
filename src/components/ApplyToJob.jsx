import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextFieldInput from "./TextField";
import { toast } from "react-toastify";
import { useGlobalContext } from "../contexts/AppContext";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  maxWidth: "96%",
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
  height: 640,
  overflowY: "scroll",
};

const initialState = {
  skills: "",
  experience: 0,
  coverLetter: "",
  resume: "",
};

const ApplyTobJob = ({ id, jobTitle, companyName }) => {
  const { applyToJob } = useGlobalContext();
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [applicationDetails, setApplicationDetails] =
    React.useState(initialState);

  const handleChange = (e) =>
    setApplicationDetails({
      ...applicationDetails,
      [e.target.name]: e.target.value,
    });

  const handleUpload = async (file) => {
    setLoading(true);

    if (file === undefined) {
      setLoading(false);
      return toast.error("Please upload your work", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }

    if (file.type !== "application/pdf") {
      setLoading(false);
      return toast.error("Only PDF files are accepted.", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }

    try {
      const url = "https://api.cloudinary.com/v1_1/dm7x7knbb/auto/upload";
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "pmt-pdf-upload");
      data.append("class", "dztxhls16");

      const res = await fetch(url, {
        method: "POST",
        body: data,
      });

      const resp = await res.json();
      if (resp) {
        toast.success("PDF file uploaded successfully.", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        setApplicationDetails({ ...applicationDetails, resume: resp.url });
      }
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = () => {
    const tempSkills = applicationDetails.skills.split(", ");
    applyToJob(
      id,
      applicationDetails,
      tempSkills,
      parseInt(applicationDetails.experience),
      initialState,
      setApplicationDetails,
      setLoading,
      setOpen
    );
  };

  return (
    <div>
      <Button
        onClick={() => setOpen(true)}
        className="w-100"
        variant="contained"
      >
        Apply
      </Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography fontSize={26} fontWeight="bold" mb={1}>
            Application to {jobTitle} Position at {companyName}
          </Typography>
          <TextFieldInput
            type="text"
            title="Skills"
            text="Separate skills using comma and space after comma"
            others="skills"
            value={applicationDetails.skills}
            onChange={handleChange}
          />
          <TextFieldInput
            type="number"
            title="Experience"
            text="In years"
            others="experience"
            value={applicationDetails.experience}
            onChange={handleChange}
          />
          <TextFieldInput
            type="text"
            title="Cover Letter"
            others="coverLetter"
            value={applicationDetails.coverLetter}
            onChange={handleChange}
            multiline={true}
            rows={10}
          />
          <div className="mb-4">
            <Typography fontSize={18}>Resume</Typography>
            <input
              type="file"
              name="resume"
              id="resume"
              accept=".pdf"
              className="form-control border"
              onChange={(e) => handleUpload(e.target.files[0])}
            />
          </div>
          <Button
            color="success"
            className="mt-2"
            variant="contained"
            disabled={loading}
            onClick={handleSubmit}
          >
            Apply
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default ApplyTobJob;
