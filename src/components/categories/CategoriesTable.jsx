import React from "react";
import { useEditCategory } from "../../hooks/categories/useEditCategory";
import { CategoryService } from "../../services/category.service";
const CategoriesTable = ({ categories, setCategories, setError }) => {
  const {
    editCategory,
    editErrors,
    onEditClick,
    handleEditCategoryChange,
    handleEditCategorySave,
  } = useEditCategory(setCategories, setError);

  const onCategoryDelete = (id) => {
    const makeDeleteApiRequest = async (signal) => {
      try {
        await CategoryService.deleteCategoryById(id, signal);
        setCategories((prev) => prev.filter((el) => el.id !== id));
      } catch (error) {
        console.log(error);
        if (error.response && error.response.status === 409) {
          setError(error.response.data);
        } else {
          setError(error.message);
        }
      }
    };

    const abortController = new AbortController();
    makeDeleteApiRequest(abortController.signal);
  };

  if (categories.length === 0) {
    return <p>No data</p>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {categories.map((category) => {
          return editCategory.id === category.id ? (
            <tr key={category.id}>
              <td>
                <input
                  name="name"
                  value={editCategory.name}
                  onChange={handleEditCategoryChange}
                />
                {editErrors.name && (
                  <p style={{ color: "darkred", margin: "0" }}>
                    {editErrors.name}
                  </p>
                )}
              </td>
              <td>
                <input
                  name="description"
                  value={editCategory.description}
                  onChange={handleEditCategoryChange}
                />
                {editErrors.description && (
                  <p style={{ color: "darkred", margin: "0" }}>
                    {editErrors.description}
                  </p>
                )}
              </td>
              <td>
                <button onClick={handleEditCategorySave}>Save</button>
                <button onClick={() => onCategoryDelete(category.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ) : (
            <tr key={category.id}>
              <td>{category.name}</td>
              <td>{category.description}</td>
              <td>
                <button onClick={() => onEditClick(category)}>Edit</button>
                <button onClick={() => onCategoryDelete(category.id)}>
                  Delete
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default CategoriesTable;
