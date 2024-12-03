import React, { useState } from "react";
import { TableRow, TableCell, Button, Box } from "@mui/material";
import EditCategoryModal from "./EditCategoryModal";

const CategoryTableRow = ({ category, onCategoryDelete, onCategoryUpdate }) => {
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  const openModal = () => {
    setEditModalOpen(true);
  };

  const closeModal = () => {
    setEditModalOpen(false);
  };

  const handleSave = async (updatedCategory) => {
    const success = await onCategoryUpdate(updatedCategory);
    if (success) {
      closeModal();
    }
  };
  const handleDelete = () => {
    onCategoryDelete(category.id);
  };

  return (
    <>
      <TableRow>
        <TableCell align="center">{category.name}</TableCell>
        <TableCell align="center">{category.description}</TableCell>
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
      <EditCategoryModal
        open={isEditModalOpen}
        onClose={closeModal}
        category={category}
        onSave={handleSave}
      />
    </>
  );
};

export default CategoryTableRow;
