import React, { useState } from "react";
import { CategoryService } from "../../services/category.service";
import { useValidateCategory } from "../../hooks/categories/useValidateCategory";
import { Button, TextField, Container } from "@mui/material";

const AddCategoryForm = ({ setCategories, setNotification }) => {
  const categoryInitial = {
    name: "",
    description: "",
  };
  const [newCategory, setNewCategory] = useState(categoryInitial);
  const { validationError, validateCategory } = useValidateCategory();

  const onCategoryChange = (event) => {
    const { name, value } = event.target;
    setNewCategory((prevCategory) => ({
      ...prevCategory,
      [name]: value,
    }));
    console.log(`${name}: ${value}`);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (!validateCategory(newCategory.name, newCategory.description)) {
      setNotification({ message: validationError, severity: "error" });
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
        setNotification({
          message: "Category created successfully",
          severity: "success",
        });
        setCategories((prev) => [...prev, { ...newCategory, id: response.id }]);
        setNewCategory(categoryInitial);
      } catch (error) {
        console.log(error);
        if (error.response && error.response.status === 409) {
          setNotification({
            message: error.response.data,
            severity: "error",
          });
        } else {
          setNotification({
            message: error.message,
            severity: "error",
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
