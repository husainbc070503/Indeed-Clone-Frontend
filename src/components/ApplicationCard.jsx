import {
  Card,
  CardContent,
  Grid,
  Table,
  TableContainer,
  Typography,
} from "@mui/material";
import React from "react";
import CompanyTableRow from "./CompanyTableRow";

const ApplicationCard = ({ item, fromRecruiter }) => {
  return (
    <Grid item md={6} xs={12}>
      <Card>
        <CardContent>
          <TableContainer>
            <Table>
              {fromRecruiter && (
                <>
                  <CompanyTableRow title="Name" text={item?.user?.name} />
                  <CompanyTableRow title="Email" text={item?.user?.email} />
                </>
              )}
              <CompanyTableRow title="Position" text={item?.job?.title} />
              <CompanyTableRow
                title="Salary"
                text={`Rs. ${Intl.NumberFormat("en-IN").format(
                  item?.job?.salary
                )} PA`}
              />
              <CompanyTableRow
                title="Company"
                text={item?.job?.company?.name}
              />
              <CompanyTableRow
                title="Location"
                text={item?.job?.company?.address}
              />
              <CompanyTableRow title="Skills" text={item?.skills?.join(", ")} />
              <CompanyTableRow title="Experience" text={item?.experience} />
              <CompanyTableRow
                title="Cover Letter"
                desc={true}
                text={item?.coverLetter}
              />
              <CompanyTableRow title="Resume" link={item?.resume} />
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default ApplicationCard;
