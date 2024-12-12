import React, { useEffect, useState, useCallback, useReducer } from "react";
import { CategoryService } from "../../services/category.service";
import CategoriesTable from "./CategoriesTable";
import SearchInput from "../../../../components/common/SearchInput";
import AddCategoryForm from "../AddCategoryForm";
import { useValidateCategory } from "../../hooks/useValidateCategory";
import { useLoading } from "../../hooks/useLoading";
import { useNotifications } from "../../../../contexts/notifications/useNotifications";
import { CategoriesCrudActionTypes } from "../../actions";
import categoriesReducer from "../../reducer";

const CategoryComponent = () => {
  const [state, dispatch] = useReducer(categoriesReducer, []);

  const { loading, turnOnLoading, turnOffLoading } = useLoading(false);
  const [filterQuery, setFilterQuery] = useState("");

  const { validateCategory } = useValidateCategory();

  const { showNotification } = useNotifications();

  useEffect(() => {
    let isMounted = true;
    const abortController = new AbortController();

    const fetchCategories = async () => {
      try {
        turnOnLoading();

        const response = await CategoryService.getAllCategories(
          abortController.signal
        );
        console.log("response", response);
        if (isMounted) {
          dispatch({
            type: CategoriesCrudActionTypes.SET_CATEGORIES,
            payload: response,
          });
        }
      } catch (error) {
        showNotification(error.message, {
          severity: "error",
          autoHideDuration: 5000,
        });
      } finally {
        turnOffLoading();
      }
    };

    fetchCategories();

    return () => {
      isMounted = false;
      abortController.abort();
    };
  }, []);

  const memoizedCategoryItemDeleteCallback = useCallback(async (id) => {
    try {
      turnOnLoading();

      const makeDeleteApiRequest = async (signal) => {
        try {
          await CategoryService.deleteCategoryById(id, signal);
          dispatch({ type: "DELETE_CATEGORY", payload: { id: id } });
          showNotification("Category deleted successfully", {
            severity: "success",
            autoHideDuration: 5000,
          });
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

      const abortController = new AbortController();
      await makeDeleteApiRequest(abortController.signal);

      turnOffLoading();
    } catch (error) {
      showNotification(error.message, {
        severity: "error",
        autoHideDuration: 5000,
      });
      turnOffLoading();
    }
  }, []);

  const memoizedSaveCategoryButtonClickCallback = useCallback(
    async (editCategory) => {
      const validationError = validateCategory(
        editCategory.name,
        editCategory.description
      );

      if (validationError !== "") {
        showNotification(validationError, {
          severity: "error",
          autoHideDuration: 5000,
        });
        return false;
      }

      try {
        const makeUpdateApiRequest = async () => {
          try {
            const abortController = new AbortController();
            const signal = abortController.signal;
            const response = await CategoryService.updateCategory(
              editCategory,
              signal
            );

            dispatch({ type: "UPDATE_CATEGORY", payload: response });

            showNotification("Category updated successfully", {
              severity: "success",
              autoHideDuration: 5000,
            });
          } catch (error) {
            if (error.status === 409) {
              showNotification(error.response?.data, {
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
        await makeUpdateApiRequest();
      } catch (error) {
        if (error.status === 409) {
          showNotification(error.response?.data, {
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
      return true;
    },
    []
  );

  const handleAddCategory = async (newCategory) => {
    console.log("newCategory", newCategory),
      dispatch({
        type: CategoriesCrudActionTypes.CREATE_CATEGORY,
        payload: {
          id: newCategory.id,
          name: newCategory.name,
          description: newCategory.description,
        },
      });
  };

  const handleFilterQueryChange = (event) => {
    setFilterQuery(event.target.value);
  };

  const filteredCategories =
    state?.filter((category) =>
      Object.keys(category).some((key) => {
        if (key === "id") return false;
        return String(category[key])
          .toLowerCase()
          .includes(filterQuery.toLowerCase());
      })
    ) || [];

  return (
    <div>
      {loading && <p>Loading...</p>}
      <SearchInput
        query={filterQuery}
        onQueryChange={handleFilterQueryChange}
      />

      <AddCategoryForm onAddCategory={handleAddCategory} />

      <CategoriesTable
        categories={filteredCategories}
        onCategoryItemDelete={memoizedCategoryItemDeleteCallback}
        onSaveCategoryButtonClick={memoizedSaveCategoryButtonClickCallback}
      />
    </div>
  );
};

export default CategoryComponent;
