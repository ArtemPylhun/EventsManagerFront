import React from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";
import UserTableRow from "./UserTableRow";
const UsersTable = ({ users, onUserItemDelete, onUserUpdate }) => {
  if (users.length === 0) {
    return <p>No data</p>;
  }

  return (
    <TableContainer component={Paper} sx={{ marginY: "1rem" }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center">Username</TableCell>
            <TableCell align="center">Fullname</TableCell>
            <TableCell align="center">Phone number</TableCell>
            <TableCell align="center">Address</TableCell>
            <TableCell align="center">Birth date</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <UserTableRow
              key={user.id}
              user={user}
              onUserDelete={onUserItemDelete}
              onUserUpdate={onUserUpdate}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UsersTable;
