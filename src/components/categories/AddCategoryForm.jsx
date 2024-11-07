import React, { useState } from "react";
import { CategoryService } from "../../services/category.service";

const AddCategoryForm = ({ setCategories, setError }) => {
  const categoryInitial = {
    name: "",
    description: "",
  };
  const errorsInitial = {
    name: "",
    description: "",
  };

  const [newCategory, setNewCategory] = useState(categoryInitial);
  const [errors, setErrors] = useState(errorsInitial);

  const onAddressBookChange = (event) => {
    setNewCategory({
      ...newCategory,
      [event.target.name]: event.target.value,
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();

    if (
      newCategory.name.trim().length < 3 ||
      newCategory.name.trim().length > 255 ||
      newCategory.description.trim().length < 5 ||
      newCategory.description.trim().length > 1000
    ) {
      if (newCategory.name.trim().length < 3) {
        setErrors((prev) => ({
          ...prev,
          name: "The category name must be at least 3 letters long",
        }));
      }
      if (newCategory.name.trim().length > 255) {
        setErrors((prev) => ({
          ...prev,
          name: "The category name must be less than 255 letters long",
        }));
      }
      if (newCategory.description.trim().length < 5) {
        setErrors((prev) => ({
          ...prev,
          description:
            "The category description must be at least 5 letters long",
        }));
      }
      if (newCategory.description.trim().length > 1000) {
        setErrors((prev) => ({
          ...prev,
          description:
            "The category description must be less than 1000 letters long",
        }));
      }
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
        console.log(response);
        setCategories((prev) => [...prev, { ...newCategory, id: response.id }]);
        setErrors(errorsInitial);
        setNewCategory(categoryInitial);
      } catch (error) {
        console.log(error);
        if (error.response && error.response.status === 409) {
          setError(error.response.data);
        } else {
          setError(error.message);
        }
      }
    };

    makeCreateApiRequest();
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        value={newCategory.name}
        name="name"
        onChange={onAddressBookChange}
      />
      {errors.name && <p style={{ color: "darkred" }}>{errors.name}</p>}

      <input
        value={newCategory.description}
        name="description"
        onChange={onAddressBookChange}
      />
      {errors.description && (
        <p style={{ color: "darkred" }}>{errors.description}</p>
      )}
      <button style={{ margin: "0px 10px" }} type="submit">
        Add
      </button>
    </form>
  );
};

export default AddCategoryForm;
