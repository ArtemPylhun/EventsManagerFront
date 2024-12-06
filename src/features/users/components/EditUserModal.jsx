import React, { useState, useEffect } from "react";
import { Modal, Box, TextField, Button } from "@mui/material";
const EditUserModal = ({ open, onClose, user, onSave }) => {
  const [updateUser, setUpdateUser] = useState(user);

  useEffect(() => {
    setUpdateUser(user);
  }, [open, user]);

  const handleUserPropChange = (event) => {
    const { name, value } = event.target;
    setUpdateUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleUserProfilePropChange = (event) => {
    const { name, value } = event.target;
    setUpdateUser((prevUser) => ({
      ...prevUser,
      profile: {
        ...prevUser.profile,
        [name]: value,
      },
    }));
  };

  const handleSave = async () => {
    const success = await onSave({ ...user, ...updateUser });
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
          label="UserName"
          name="userName"
          value={updateUser.userName}
          onChange={handleUserPropChange}
          fullWidth
        />
        <TextField
          label="FullName"
          name="fullName"
          value={updateUser.profile.fullName}
          onChange={handleUserProfilePropChange}
          fullWidth
        />
        <TextField
          label="PhoneNumber"
          name="phoneNumber"
          value={updateUser.profile.phoneNumber}
          onChange={handleUserProfilePropChange}
          fullWidth
        />
        <TextField
          label="BirthDate"
          name="birthDate"
          value={
            updateUser.profile.birthDate
              ? new Date(updateUser.profile.birthDate)
                  .toISOString()
                  .split("T")[0]
              : ""
          }
          onChange={handleUserProfilePropChange}
          type="date"
          fullWidth
        />
        <TextField
          label="Address"
          name="address"
          value={updateUser.profile.address}
          onChange={handleUserProfilePropChange}
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

export default EditUserModal;

/* <label>
          UserName:
          <input
            type="text"
            name="userName"
            value={userData.userName}
            onChange={handleInputChange}
            required
          />
          {userValidationErrors.userName && (
            <p style={{ color: "darkred" }}>{userValidationErrors.userName}</p>
          )}
        </label>
        <label>
          FullName:
          <input
            type="text"
            name="fullName"
            value={userData.fullName}
            onChange={handleInputChange}
            required
          />
          {userValidationErrors.fullName && (
            <p style={{ color: "darkred" }}>{userValidationErrors.fullName}</p>
          )}
        </label>
        <label>
          PhoneNumber:
          <input
            type="text"
            name="phoneNumber"
            value={userData.phoneNumber}
            onChange={handleInputChange}
            required
          />
          {userValidationErrors.phoneNumber && (
            <p style={{ color: "darkred" }}>
              {userValidationErrors.phoneNumber}
            </p>
          )}
        </label>
        <label>
          Address:
          <input
            type="text"
            name="address"
            value={userData.address}
            onChange={handleInputChange}
            required
          />
          {userValidationErrors.address && (
            <p style={{ color: "darkred" }}>{userValidationErrors.address}</p>
          )}
        </label>
        <label>
          BirthDate:
          <input
            type="date"
            name="birthDate"
            value={userData.birthDate}
            onChange={handleInputChange}
            required
          />
          {userValidationErrors.birthDate && (
            <p style={{ color: "darkred" }}>{userValidationErrors.birthDate}</p>
          )}
        </label> */
