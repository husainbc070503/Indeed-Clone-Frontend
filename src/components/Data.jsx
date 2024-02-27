import { TableCell, Typography } from "@mui/material";
import React from "react";

const Data = ({ align, text, fromData, description, width, textTransform }) => {
  return (
    <TableCell align={align} width={width}>
      <Typography
        fontSize={fromData ? (description ? 14 : 17) : 20}
        fontWeight={!fromData && "bold"}
        textAlign="center"
        sx={{ textTransform }}
      >
        {text}
      </Typography>
    </TableCell>
  );
};

export default Data;
