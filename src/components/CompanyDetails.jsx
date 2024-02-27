import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { Table, TableContainer } from "@mui/material";
import CompanyTableRow from "./CompanyTableRow";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  maxWidth: "96%",
  bgcolor: "background.paper",
  boxShadow: 24,
  height: 600,
  overflowY: "scroll",
  p: 4,
  borderRadius: 2,
};

const CompanyDetails = ({ company }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="d-inline-block ms-2">
      <RemoveRedEyeIcon
        onClick={() => setOpen(true)}
        className="icon fs-4"
        color="primary"
      />
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography fontSize={30} fontWeight="bold" color="primary">
            Company
          </Typography>
          <TableContainer>
            <Table>
              <CompanyTableRow title="Company" text={company?.name} />
              <CompanyTableRow
                title="About"
                text={company?.description}
                desc={true}
              />
              <CompanyTableRow
                title="Type"
                text={
                  company?.type[0].toUpperCase() + company?.type.substring(1)
                }
              />
              <CompanyTableRow title="Strength" text={company?.strength} />
              <CompanyTableRow title="Address" text={company?.address} />
            </Table>
          </TableContainer>
        </Box>
      </Modal>
    </div>
  );
};

export default CompanyDetails;
