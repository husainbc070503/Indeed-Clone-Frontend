import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";
import { useGlobalContext } from "../contexts/AppContext";
import Data from "./Data";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const CompanyTable = ({ handleClick }) => {
  const { companies, user, deleteCompany } = useGlobalContext();

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <Data align="center" text="Sr.No." />
            <Data align="center" text="Name" />
            <Data align="center" text="Description" />
            <Data align="center" text="Type" />
            <Data align="center" text="Strength" />
            <Data align="center" text="Address" />
            <Data align="center" text="Action" />
          </TableRow>
        </TableHead>
        <TableBody>
          {companies?.length > 0 ? (
            companies
              ?.filter((item) => item?.user?._id === user?.user?._id)
              .map((item, ind) => {
                const { _id, name, description, type, strength, address } =
                  item;

                return (
                  <TableRow key={ind}>
                    <Data align="center" text={`${ind + 1}.`} fromData={true} />
                    <Data align="center" text={name} fromData={true} />
                    <Data
                      align="center"
                      text={
                        description.substring(0, 80) +
                        (description.length > 80 && "...")
                      }
                      description={true}
                      fromData={true}
                    />
                    <Data
                      align="center"
                      text={type}
                      fromData={true}
                      textTransform="capitalize"
                    />
                    <Data align="center" text={strength} fromData={true} />
                    <Data
                      align="center"
                      text={address}
                      description={true}
                      fromData={true}
                    />
                    <TableCell align="center">
                      <EditIcon
                        className="icon fs-5"
                        color="success"
                        onClick={() => handleClick(item)}
                      />
                      <DeleteIcon
                        className="icon fs-5"
                        color="error"
                        onClick={() => deleteCompany(_id)}
                      />
                    </TableCell>
                  </TableRow>
                );
              })
          ) : (
            <TableCell colSpan={6} align="center">
              <Typography fontSize={18}>No companies added</Typography>
            </TableCell>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CompanyTable;
