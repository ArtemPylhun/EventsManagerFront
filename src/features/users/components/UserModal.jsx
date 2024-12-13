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
import { useNotifications } from "../../../contexts/notifications/useNotifications";

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
    birthDate: "",
  },
};
const UserModal = ({ user, setUsers, editMode }) => {
  const [formData, setFormData] = useState(
    user ? { ...user, profile: { ...user.profile } } : initialUser
  );
  const [isLoading, setIsLoading] = useState(false);
  const { showNotification } = useNotifications();
  const { isOpen, fields, closeDialog } = useUserDialogContext();
  const { validateCreateUser } = useCreateValidateUser();
  const { validateUpdateUser } = useUpdateValidateUser();

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
      showNotification(validationError, {
        severity: "error",
        autoHideDuration: 5000,
      });
      return null;
    }
    try {
      const response = await UserService.updateUser(
        formDataWithoutPassword,
        signal
      );
      showNotification("User updated successfully!", {
        severity: "success",
        autoHideDuration: 5000,
      });
      return response;
    } catch (error) {
      if (error.response && error.response.status === 409) {
        showNotification(error.response.data, {
          severity: "error",
          autoHideDuration: 5000,
        });
      } else {
        showNotification(error.message, {
          severity: "error",
          autoHideDuration: 5000,
        });
      }
      return null;
    }
  };

  const makeCreateApiRequest = async (signal) => {
    const validationError = validateCreateUser(formData);
    if (validationError) {
      showNotification(validationError, {
        severity: "error",
        autoHideDuration: 5000,
      });
      return null;
    }
    try {
      const response = await UserService.registerUser(formData, signal);
      showNotification("User created successfully!", {
        severity: "success",
        autoHideDuration: 5000,
      });
      return response;
    } catch (error) {
      if (error.response && error.response.status === 409) {
        showNotification(error.response.data, {
          severity: "error",
          autoHideDuration: 5000,
        });
      } else {
        showNotification(error.message, {
          severity: "error",
          autoHideDuration: 5000,
        });
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
      if (!updatedUser) {
        setIsLoading(false);
        return null;
      }
      console.log("updatedUser before setUsers", updatedUser);
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === updatedUser.id ? updatedUser : user
        )
      );
    } else {
      const createdUser = await makeCreateApiRequest(signal);
      if (!createdUser) {
        setIsLoading(false);
        return null;
      }
      setUsers((prevUsers) => [...prevUsers, createdUser]);
    }
    setIsLoading(false);
    closeDialog();
  };

  const handleClose = () => {
    console.log(user);
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
          width: 300,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography color="black" variant="h6" component="h2" gutterBottom>
          {editMode ? `Edit User: ${formData.userName}` : "Create New User"}
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid2
            pt={2}
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            {fields.map((field) => {
              const fieldValue = field.includes(".")
                ? field.split(".").reduce((obj, key) => obj[key], formData)
                : formData[field];

              return (
                <Grid2
                  xs={12}
                  key={field}
                  sx={{
                    width: "100%",
                    mb: field === "profile.birthDate" ? 0 : 2,
                  }}
                >
                  <TextField
                    fullWidth
                    label={formatInput(field)}
                    id={field}
                    name={field}
                    type={field === "profile.birthDate" ? "date" : "text"}
                    value={
                      field === "profile.birthDate" && fieldValue
                        ? new Date(fieldValue).toISOString().split("T")[0]
                        : fieldValue || ""
                    }
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
              type="button"
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

const formatInput = (string) => {
  const parts = string.split("profile.");
  return parts
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
};

export default UserModal;
