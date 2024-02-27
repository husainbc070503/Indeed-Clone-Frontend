import { Button, TableCell, TableRow, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const CompanyTableRow = ({ title, text, desc, link }) => {
  return (
    <TableRow>
      <TableCell>
        <Typography fontSize={20} fontWeight="bold">
          {title}
        </Typography>
      </TableCell>
      <TableCell>
        {text && (
          <Typography fontSize={20} textAlign={desc && "justify"}>
            {text}
          </Typography>
        )}
        {link && (
          <Link to={link} className="link" target="_blank">
            <Button variant="contained">View</Button>
          </Link>
        )}
      </TableCell>
    </TableRow>
  );
};

export default CompanyTableRow;
