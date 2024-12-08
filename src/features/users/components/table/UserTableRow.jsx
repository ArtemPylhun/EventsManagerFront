import React from "react";
import { TableRow, TableCell, Button, Box } from "@mui/material";
import { useUserDialogContext } from "../../../../contexts/userDialogContext/useUserDialogContext";
import UserModal from "../UserModal";

const UserTableRow = ({ user, onUserDelete, onUserUpdate }) => {
  const { openDialog, isOpen, userId } = useUserDialogContext();
  const openEditModal = () => {
    openDialog(user.id, [
      "userName",
      "profile.fullName",
      "profile.phoneNumber",
      "profile.address",
      "profile.birthDate",
    ]);
  };
  const handleDelete = () => {
    onUserDelete(user.id);
  };
  return (
    <>
      <TableRow>
        <TableCell align="center">{user.userName}</TableCell>
        <TableCell align="center">{user.profile.fullName}</TableCell>
        <TableCell align="center">{user.profile.phoneNumber}</TableCell>
        <TableCell align="center">{user.profile.address}</TableCell>
        <TableCell align="center">
          {new Date(user.profile.birthDate).toISOString().split("T")[0]}
        </TableCell>
        <TableCell align="center">
          <Box display="flex" gap={1} justifyContent="center">
            <Button onClick={openEditModal} variant="outlined" color="primary">
              Edit
            </Button>
            <Button onClick={handleDelete} variant="contained" color="error">
              Delete
            </Button>
          </Box>
        </TableCell>
      </TableRow>
      {isOpen && user.id === userId && (
        <UserModal user={user} setUsers={onUserUpdate} editMode />
      )}
    </>
  );
};

export default UserTableRow;
