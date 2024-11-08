import React, { useState } from "react";

export const useEditCategory = (setCategories, categoryService, setError) => {
  const categoryInitial = {
    id: "",
    name: "",
    description: "",
  };
  const errorsInitial = {
    name: "",
    description: "",
  };

  const [editCategory, setEditCategory] = useState(categoryInitial);
  const [editErrors, setEditErrors] = useState(errorsInitial);

  const handleEditCategorySave = () => {
    if (
      editCategory.name.trim().length < 3 ||
      editCategory.name.trim().length > 255 ||
      editCategory.description.trim().length < 5 ||
      editCategory.description.trim().length > 1000
    ) {
      if (editCategory.name.trim().length < 3) {
        setEditErrors((prev) => {
          return {
            ...prev,
            name: "The category name must be at least 3 letters long",
          };
        });
      }
      if (editCategory.name.trim().length > 255) {
        setEditErrors((prev) => {
          return {
            ...prev,
            name: "The category name must be less then 255 letters long",
          };
        });
      }
      if (editCategory.description.trim().length < 5) {
        setEditErrors((prev) => {
          return {
            ...prev,
            description:
              "The category description must be at least 5 letters long",
          };
        });
      }
      if (editCategory.description.trim().length > 1000) {
        setEditErrors((prev) => {
          return {
            ...prev,
            description:
              "The category description must be less then 1000 letters long",
          };
        });
      }
      return;
    }

    const makeUpdateApiRequest = async () => {
      try {
        const response = await categoryService.updateCategory(editCategory);

        setCategories((prev) =>
          prev.map((el) => {
            if (el.id === editCategory.id) {
              return editCategory;
            }
            return el;
          })
        );
        setEditErrors(errorsInitial);
        setEditCategory(categoryInitial);
      } catch (error) {
        console.log(error);
        if (error.status === 409) {
          setError(error.response?.data);
        } else {
          setError(error.message);
        }
      }
    };

    makeUpdateApiRequest();
  };

  const onEditClick = (category) => {
    setEditCategory(category);
  };

  const handleEditCategoryChange = (event) => {
    setEditCategory({
      ...editCategory,
      [event.target.name]: event.target.value,
    });
  };

  return {
    editCategory,
    editErrors,
    onEditClick,
    handleEditCategoryChange,
    handleEditCategorySave,
  };
};
