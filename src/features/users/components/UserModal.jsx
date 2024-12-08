import React, { useEffect, useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Grid2,
} from "@mui/material";
import { UserService } from "../services/user.service";
import { useUserDialogContext } from "../../../contexts/userDialogContext/useUserDialogContext";
import { useCreateValidateUser } from "../hooks/useCreateValidateUser";
import { useUpdateValidateUser } from "../hooks/useUpdateValidateUser";

const initialUser = {
  id: "",
  userName: "",
  email: "",
  password: "",
  profile: {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    address: "",
  },
};
const UserModal = ({ user, setUsers, editMode }) => {
  const [formData, setFormData] = useState(initialUser);
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, fields, closeDialog, setNotification } =
    useUserDialogContext();
  const { validateCreateUser } = useCreateValidateUser();
  const { validateUpdateUser } = useUpdateValidateUser();

  useEffect(() => {
    if (user) {
      setFormData(user);
    } else {
      setFormData(initialUser);
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const nameParts = name.split(".");
    setFormData((prevData) => {
      let newData = { ...prevData };
      let nestedField = newData;
      for (let i = 0; i < nameParts.length - 1; i++) {
        nestedField = nestedField[nameParts[i]];
      }
      nestedField[nameParts[nameParts.length - 1]] = value;
      return newData;
    });
  };

  const makeUpdateApiRequest = async (signal) => {
    const { password, ...formDataWithoutPassword } = formData;
    const validationError = validateUpdateUser(formDataWithoutPassword);
    if (validationError) {
      setNotification({ message: validationError, severity: "error" });
      return null;
    }
    try {
      const response = await UserService.updateUser(
        formDataWithoutPassword,
        signal
      );
      setNotification({
        message: "User updated successfully!",
        severity: "success",
        autoHideDuration: 5000,
      });
      return response;
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setNotification({ message: error.response.data, severity: "error" });
      } else {
        setNotification({ message: error.message, severity: "error" });
      }
      return null;
    }
  };

  const makeCreateApiRequest = async (signal) => {
    const validationError = validateCreateUser(formData);
    if (validationError) {
      setNotification({ message: validationError, severity: "error" });
      return null;
    }
    try {
      const response = await UserService.registerUser(formData, signal);
      setNotification({
        message: "User created successfully!",
        severity: "success",
      });
      return response;
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setNotification({ message: error.response.data, severity: "error" });
      } else {
        setNotification({ message: error.message, severity: "error" });
      }
      return null;
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const abortController = new AbortController();
    const signal = abortController.signal;

    if (editMode) {
      const updatedUser = await makeUpdateApiRequest(signal);
      if (!updatedUser) return null;
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === updatedUser.id ? updatedUser : user
        )
      );
    } else {
      const createdUser = await makeCreateApiRequest(signal);
      if (!createdUser) return null;
      setUsers((prevUsers) => [...prevUsers, createdUser]);
    }
    setIsLoading(false);
    closeDialog();
  };

  const handleClose = () => {
    closeDialog();
  };
  return (
    <Modal open={isOpen} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" component="h2" gutterBottom>
          {editMode ? `Edit User: ${formData.userName}` : "Create New User"}
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid2 container spacing={2}>
            {fields.map((field) => {
              const fieldValue = field.includes(".")
                ? field.split(".").reduce((obj, key) => obj[key], formData)
                : formData[field];

              return (
                <Grid2 xs={12} key={field}>
                  <TextField
                    fullWidth
                    label={capitalizeFirstLetter(field)}
                    id={field}
                    name={field}
                    value={fieldValue || ""} // Use the correct field value
                    onChange={handleInputChange}
                    disabled={isLoading}
                    variant="outlined"
                  />
                </Grid2>
              );
            })}
          </Grid2>

          <Box sx={{ mt: 3, display: "flex", justifyContent: "space-between" }}>
            <Button
              variant="outlined"
              color="error"
              onClick={handleClose}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={isLoading}
              startIcon={isLoading ? <CircularProgress size={20} /> : null}
            >
              {isLoading ? "Submitting..." : "Submit"}
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export default UserModal;
