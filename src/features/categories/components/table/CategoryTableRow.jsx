import React, { useState } from "react";
import { TableRow, TableCell, Button, Box } from "@mui/material";
import EditCategoryModal from "../EditCategoryModal";
import DeleteConfirmationModal from "../../../../components/common/DeleteConfirmationModal";

const CategoryTableRow = ({ category, onCategoryDelete, onCategoryUpdate }) => {
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  const openEditModal = () => setEditModalOpen(true);
  const closeEditModal = () => setEditModalOpen(false);

  const handleSave = async (updatedCategory) => {
    const success = await onCategoryUpdate(updatedCategory);
    if (success) {
      closeEditModal();
    }
  };

  const openDeleteModal = () => setDeleteModalOpen(true);
  const closeDeleteModal = () => setDeleteModalOpen(false);

  const handleDelete = () => {
    onCategoryDelete(category.id);
    closeDeleteModal();
  };

  return (
    <>
      <TableRow>
        <TableCell align="center">{category.name}</TableCell>
        <TableCell align="center">{category.description}</TableCell>
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

      <EditCategoryModal
        open={isEditModalOpen}
        onClose={closeEditModal}
        category={category}
        onSave={handleSave}
      />

      <DeleteConfirmationModal
        open={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleDelete}
        title="Confirm Delete"
        description={`Are you sure you want to delete the category "${category.name}"? This action cannot be undone.`}
      />
    </>
  );
};

export default CategoryTableRow;
