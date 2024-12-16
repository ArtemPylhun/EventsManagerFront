import React, { useState } from "react";
import { TableRow, TableCell, Button, Box } from "@mui/material";
import UserModal from "../UserModal";
import DeleteConfirmationModal from "../../../../components/common/DeleteConfirmationModal";
import { useUserDialogContext } from "../../../../contexts/userDialogContext/useUserDialogContext";

const UserTableRow = ({ user, onUserDelete, onUserUpdate }) => {
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

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

  const openDeleteModal = () => setDeleteModalOpen(true);
  const closeDeleteModal = () => setDeleteModalOpen(false);

  const handleDelete = () => {
    onUserDelete(user.id);
    closeDeleteModal();
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
            <Button onClick={openDeleteModal} variant="contained" color="error">
              Delete
            </Button>
          </Box>
        </TableCell>
      </TableRow>
      {isOpen && user.id === userId && (
        <UserModal user={user} setUsers={onUserUpdate} editMode />
      )}
      <DeleteConfirmationModal
        open={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleDelete}
        title="Confirm Delete"
        description={`Are you sure you want to delete the user "${user.userName}"? This action cannot be undone.`}
      />
    </>
  );
};

export default UserTableRow;
