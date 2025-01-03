import { useState } from "react";
import { Button, TextField, Container } from "@mui/material";
import { CategoryService } from "../services/category.service";
import { useValidateCategory } from "../hooks/useValidateCategory";
import { useNotifications } from "../../../contexts/notifications/useNotifications";

const AddCategoryForm = ({ onAddCategory }) => {
  const categoryInitial = {
    name: "",
    description: "",
  };

  const [newCategory, setNewCategory] = useState(categoryInitial);

  const { validateCategory } = useValidateCategory();
  const { showNotification } = useNotifications();

  const onCategoryChange = (event) => {
    const { name, value } = event.target;
    setNewCategory((prevCategory) => ({
      ...prevCategory,
      [name]: value,
    }));
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const validationError = validateCategory(
      newCategory.name,
      newCategory.description
    );
    if (validationError) {
      showNotification(validationError, {
        severity: "error",
        autoHideDuration: 5000,
      });
      return;
    }
    const makeCreateApiRequest = async () => {
      try {
        const abortController = new AbortController();
        const signal = abortController.signal;
        const response = await CategoryService.createCategory(
          newCategory,
          signal
        );
        showNotification("Category created successfully", {
          severity: "success",
          autoHideDuration: 5000,
        });
        onAddCategory(response);
        setNewCategory(categoryInitial);
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
      }
    };

    makeCreateApiRequest();
  };

  return (
    <form onSubmit={onSubmit}>
      <Container
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: "10px",
          justifyContent: "space-between",
        }}
      >
        <TextField
          value={newCategory.name}
          name="name"
          label="Name"
          onChange={onCategoryChange}
          variant="outlined"
        />

        <TextField
          value={newCategory.description}
          name="description"
          label="Description"
          onChange={onCategoryChange}
          variant="outlined"
        />
        <Button type="submit" variant="contained">
          Add
        </Button>
      </Container>
    </form>
  );
};

export default AddCategoryForm;
