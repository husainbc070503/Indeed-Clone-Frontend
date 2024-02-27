import {
  Button,
  Card,
  CardContent,
  Chip,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../contexts/AppContext";
import CompanyDetails from "./CompanyDetails";
import ApplyTobJob from "./ApplyToJob";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";

const JobCard = ({ item, fromUser, alreadyBookmarked }) => {
  const {
    _id,
    title,
    description,
    salary,
    company,
    joiningDate,
    experience,
    skillsRequired,
    jobTypes,
    responsibilities,
    educationEligibility,
  } = item;

  const { deleteJob, bookmarkJob, removeBookmark } = useGlobalContext();

  return (
    <Grid item md={4} xs={12}>
      <Card>
        <CardContent>
          <Grid container justifyContent="space-between">
            <Grid item md={11} xs={11}>
              <Typography fontSize={28} fontWeight="bold" mb={1}>
                {title}
              </Typography>
            </Grid>
            {fromUser && (
              <Grid item md={1} xs={1} mt={1}>
                {!alreadyBookmarked ? (
                  <BookmarkBorderIcon
                    className="icon fs-3"
                    onClick={() => bookmarkJob(_id)}
                  />
                ) : (
                  <BookmarkIcon
                    className="icon fs-3"
                    onClick={() => removeBookmark(_id)}
                  />
                )}
              </Grid>
            )}
          </Grid>
          <Typography fontSize={16} mb={1} textAlign="justify">
            {description.substring(0, 100) + "..."}
          </Typography>
          <Typography fontSize={22} mb={1} fontWeight="bold">
            &#8377;{Intl.NumberFormat("en-IN").format(salary)} PA
          </Typography>
          <Typography fontSize={20} fontWeight="bold">
            Skills Required
          </Typography>
          <Typography fontSize={18} mb={1}>
            {skillsRequired?.join(", ")}
          </Typography>
          <Typography fontSize={20} display="inline-block" fontWeight="bold">
            Company
          </Typography>
          <CompanyDetails company={company} />
          <Typography fontSize={20} fontWeight="bold" mb={1}>
            Experience
          </Typography>
          <Typography fontSize={18} mb={1}>
            {experience} year{experience > 1 && "s"}
          </Typography>
          <div className="my-1">
            {jobTypes?.map((item, ind) => (
              <Chip
                color="primary"
                variant="outlined"
                label={item}
                key={ind}
                className="me-2 fs-6 mb-2"
              />
            ))}
          </div>
          <Typography fontSize={20} fontWeight="bold" mb={1}>
            Responsibilities
          </Typography>
          <Typography fontSize={16} textAlign="justify" mb={1}>
            {responsibilities}
          </Typography>
          <Typography fontSize={20} fontWeight="bold" mb={1}>
            Criteria
          </Typography>
          <Typography fontSize={16} textAlign="justify" mb={1}>
            {educationEligibility}
          </Typography>
          <Typography fontSize={20} fontWeight="bold" mb={1}>
            Joining
          </Typography>
          <Typography fontFamily={18}>
            {new Date(joiningDate).toDateString()}
          </Typography>
          {!fromUser ? (
            <div className="mt-2">
              <Link className="link" to={`../editJob/${_id}`}>
                <EditIcon className="icon fs-5" color="success" />
              </Link>
              <DeleteIcon
                className="icon fs-5"
                color="error"
                onClick={() => deleteJob(_id)}
              />
            </div>
          ) : (
            <div className="mt-3">
              <ApplyTobJob
                id={_id}
                jobTitle={title}
                companyName={company?.name}
              />
            </div>
          )}
        </CardContent>
      </Card>
    </Grid>
  );
};

export default JobCard;
