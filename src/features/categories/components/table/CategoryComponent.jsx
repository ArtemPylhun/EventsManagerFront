import React, { useEffect, useState, useCallback } from "react";
import { CategoryService } from "../../services/category.service";
import CategoriesTable from "./CategoriesTable";
import SearchInput from "../../../../components/common/SearchInput";
import AddCategoryForm from "../AddCategoryForm";
import { useValidateCategory } from "../../hooks/useValidateCategory";
import { useNotifications } from "../../../../contexts/notifications/useNotifications";

const CategoryComponent = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterQuery, setFilterQuery] = useState("");

  const { validateCategory, validationError } = useValidateCategory();

  const { showNotification } = useNotifications();

  useEffect(() => {
    let isMounted = true;
    const abortController = new AbortController();

    const fetchCategories = async () => {
      try {
        setLoading(true);

        const response = await CategoryService.getAllCategories(
          abortController.signal
        );
        if (isMounted) {
          setCategories(response);
        }
      } catch (error) {
        showNotification(error.message, {
          severity: "error",
          autoHideDuration: 5000,
        });
      } finally {
        setLoading(false);
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
      setLoading(true);

      const makeDeleteApiRequest = async (signal) => {
        try {
          await CategoryService.deleteCategoryById(id, signal);
          setCategories((prev) => prev.filter((el) => el.id !== id));
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

      setLoading(false);
    } catch (error) {
      showNotification(error.message, {
        severity: "error",
        autoHideDuration: 5000,
      });
      setLoading(false);
    }
  }, []);

  const memoizedSaveCategoryButtonClickCallback = useCallback(
    async (editCategory) => {
      const isValid = validateCategory(
        editCategory.name,
        editCategory.description
      );

      if (!isValid) {
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

            setCategories((prev) =>
              prev.map((el) => {
                if (el.id === editCategory.id) {
                  return editCategory;
                }
                return el;
              })
            );

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
        showNotification(error.message, {
          severity: "error",
          autoHideDuration: 5000,
        });
      }

      return true;
    },
    [validationError]
  );

  const handleFilterQueryChange = (event) => {
    setFilterQuery(event.target.value);
  };

  const filteredCategories =
    categories?.filter((category) =>
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

      <AddCategoryForm setCategories={setCategories} />

      <CategoriesTable
        categories={filteredCategories}
        onCategoryItemDelete={memoizedCategoryItemDeleteCallback}
        onSaveCategoryButtonClick={memoizedSaveCategoryButtonClickCallback}
      />
    </div>
  );
};

export default CategoryComponent;
