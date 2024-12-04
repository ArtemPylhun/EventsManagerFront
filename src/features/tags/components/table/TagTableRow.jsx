import React, { useState } from "react";
import { TableRow, TableCell, Button, Box } from "@mui/material";
import EditTagModal from "../EditTagModal";

const TagTableRow = ({ tag, onTagDelete, onTagUpdate }) => {
  const [isEditModalOpen, setEditModalOpen] = useState(false);
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
  const handleDelete = () => {
    onTagDelete(tag.id);
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
            <Button onClick={handleDelete} variant="contained" color="error">
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
    </>
  );
};

export default TagTableRow;
