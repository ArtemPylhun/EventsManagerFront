import React, { useState } from "react";
import { TableRow, TableCell, Button, Box } from "@mui/material";
import EditTagModal from "../EditTagModal";
import DeleteConfirmationModal from "../../../../components/common/DeleteConfirmationModal";

const TagTableRow = ({ tag, onTagDelete, onTagUpdate }) => {
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  const openModal = () => {
    setEditModalOpen(true);
  };

  const closeModal = () => {
    setEditModalOpen(false);
  };

  const handleSave = async (updatedTag) => {
    const success = await onTagUpdate(updatedTag);
    if (success) {
      closeModal();
    }
  };

  const openDeleteModal = () => setDeleteModalOpen(true);
  const closeDeleteModal = () => setDeleteModalOpen(false);
  const handleDelete = () => {
    onTagDelete(tag.id);
    closeDeleteModal();
  };

  return (
    <>
      <TableRow key={tag.id}>
        <TableCell align="center">{tag.title}</TableCell>
        <TableCell align="center">
          <Box display="flex" gap={1} justifyContent="center">
            <Button onClick={openModal} variant="outlined" color="primary">
              Edit
            </Button>
            <Button onClick={openDeleteModal} variant="contained" color="error">
              Delete
            </Button>
          </Box>
        </TableCell>
      </TableRow>

      <EditTagModal
        open={isEditModalOpen}
        onClose={closeModal}
        tag={tag}
        onSave={handleSave}
      />

      <DeleteConfirmationModal
        open={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleDelete}
        title="Confirm Delete"
        description={`Are you sure you want to delete the tag "${tag.title}"? This action cannot be undone.`}
      />
    </>
  );
};

export default TagTableRow;
