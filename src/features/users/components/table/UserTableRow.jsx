import React, { useState } from "react";
import { TableRow, TableCell, Button, Box } from "@mui/material";
import EditUserModal from "../EditUserModal";

const UserTableRow = ({ user, onUserDelete, onUserUpdate }) => {
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const openModal = () => {
    setEditModalOpen(true);
  };

  const closeModal = () => {
    setEditModalOpen(false);
  };

  const handleSave = async (updatedUser) => {
    const success = await onUserUpdate(updatedUser);
    if (success) {
      closeModal();
    }
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
            <Button onClick={openModal} variant="outlined" color="primary">
              Edit
            </Button>
            <Button onClick={handleDelete} variant="contained" color="error">
              Delete
            </Button>
          </Box>
        </TableCell>
      </TableRow>
      <EditUserModal
        open={isEditModalOpen}
        onClose={closeModal}
        user={user}
        onSave={handleSave}
      />
    </>
  );
};

export default UserTableRow;
