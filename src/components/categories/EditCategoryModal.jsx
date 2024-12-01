import React, { useState, useEffect } from "react";
import { Modal, Box, TextField, Button } from "@mui/material";

const EditCategoryModal = ({ open, onClose, category, onSave }) => {
  const [name, setName] = useState(category.name);
  const [description, setDescription] = useState(category.description);

  useEffect(() => {
    setName(category.name);
    setDescription(category.description);
  }, [open, category]);

  const handleSave = () => {
    const success = onSave({ ...category, name, description });
    if (success) {
      onClose();
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
        />
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
        />
        <Box display="flex" justifyContent="flex-end" gap={1}>
          <Button onClick={onClose} variant="outlined" color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSave} variant="contained" color="primary">
            Save
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default EditCategoryModal;
