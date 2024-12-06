import React, { useState, useEffect } from "react";
import { Modal, Box, TextField, Button } from "@mui/material";

const AddUserModal = ({ open, onClose, onSave }) => {
  const userInitial = {
    profile: null,
    email: "",
    userName: "",
    password: "",
  };

  const [newUser, setNewUser] = useState(userInitial);

  useEffect(() => {
    setNewUser(userInitial);
  }, [open]);

  const handleUserChange = (event) => {
    const { name, value } = event.target;
    setNewUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    const success = await onSave({ ...newUser });
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
          label="Email"
          name="email"
          value={newUser.email}
          onChange={handleUserChange}
          fullWidth
        />
        <TextField
          label="UserName"
          name="userName"
          value={newUser.userName}
          onChange={handleUserChange}
          fullWidth
        />
        <TextField
          label="Password"
          name="password"
          value={newUser.password}
          onChange={handleUserChange}
          fullWidth
        />
        <Box display="flex" justifyContent="flex-end" gap={1}>
          <Button onClick={onClose} variant="outlined" color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSave} variant="contained" color="primary">
            Add
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddUserModal;
