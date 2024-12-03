import { useState } from "react";
import { CategoryService } from "../../services/category.service";
import { useValidateCategory } from "../../hooks/categories/useValidateCategory";
import { Button, TextField, Container } from "@mui/material";
import { useNotifications } from "../../contexts/notifications/useNotifications";

const AddCategoryForm = ({ setCategories }) => {
  const categoryInitial = {
    name: "",
    description: "",
  };
  const [newCategory, setNewCategory] = useState(categoryInitial);
  const { validationError, validateCategory } = useValidateCategory();
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
    if (!validateCategory(newCategory.name, newCategory.description)) {
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
        setCategories((prev) => [...prev, { ...newCategory, id: response.id }]);
        setNewCategory(categoryInitial);
      } catch (error) {
        console.log(error);
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
