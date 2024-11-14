import React, { useState } from "react";
import { CategoryService } from "../../services/category.service";
import { useValidateCategory } from "../../hooks/categories/useValidateCategory";

const AddCategoryForm = ({ setCategories, setError }) => {
  const categoryInitial = {
    name: "",
    description: "",
  };
  const [newCategory, setNewCategory] = useState(categoryInitial);
  const { validationErrors, validateCategory } = useValidateCategory();

  const onCategoryChange = (event) => {
    setNewCategory({
      ...newCategory,
      [event.target.name]: event.target.value,
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();

    if (validateCategory(newCategory.name, newCategory.description)) {
      const makeCreateApiRequest = async () => {
        try {
          const abortController = new AbortController();
          const signal = abortController.signal;
          const response = await CategoryService.createCategory(
            newCategory,
            signal
          );
          setCategories((prev) => [
            ...prev,
            { ...newCategory, id: response.id },
          ]);
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
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <input value={newCategory.name} name="name" onChange={onCategoryChange} />
      {validationErrors.name && (
        <p style={{ color: "darkred" }}>{validationErrors.name}</p>
      )}

      <input
        value={newCategory.description}
        name="description"
        onChange={onCategoryChange}
      />
      {validationErrors.description && (
        <p style={{ color: "darkred" }}>{validationErrors.description}</p>
      )}
      <button style={{ margin: "0px 10px" }} type="submit">
        Add
      </button>
    </form>
  );
};

export default AddCategoryForm;
