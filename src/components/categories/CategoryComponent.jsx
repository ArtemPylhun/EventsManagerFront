import React, { useEffect, useState, useCallback } from "react";
import { CategoryService } from "../../services/category.service";
import CategoriesTable from "./CategoriesTable";
import SearchInput from "../SearchInput";
import AddCategoryForm from "./AddCategoryForm";
import NotificationSnackbar from "../NotificationSnackbar";
import { useValidateCategory } from "../../hooks/categories/useValidateCategory";

const CategoryComponent = () => {
  const notificationInitial = {
    message: "",
    severity: "",
  };

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(notificationInitial);
  const [filterQuery, setFilterQuery] = useState("");
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

  const { validateCategory, validationError } = useValidateCategory();

  useEffect(() => {
    let isMounted = true;
    const abortController = new AbortController();

    const fetchCategories = async () => {
      try {
        setLoading(true);
        setNotification(notificationInitial);

        const response = await CategoryService.getAllCategories(
          abortController.signal
        );
        if (isMounted) {
          setCategories(response);
        }
      } catch (error) {
        handleNotificationChange({
          message: error.message,
          severity: "error",
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
        } catch (error) {
          console.log(error);
          if (error.response && error.response.status === 409) {
            handleNotificationChange({
              message: error.response.data,
              severity: "error",
            });
          } else {
            handleNotificationChange({
              message: error.message,
              severity: "error",
            });
          }
        }
      };

      const abortController = new AbortController();
      await makeDeleteApiRequest(abortController.signal);

      setLoading(false);
    } catch (error) {
      handleNotificationChange({
        message: error.message,
        severity: "error",
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
        handleNotificationChange({
          message: validationError,
          severity: "error",
        });
        return false; // Stop further execution
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
          } catch (error) {
            if (error.status === 409) {
              handleNotificationChange({
                message: error.response?.data,
                severity: "error",
              });
            } else {
              handleNotificationChange({
                message: error.message,
                severity: "error",
              });
            }
          }
        };
        await makeUpdateApiRequest();
      } catch (error) {
        handleNotificationChange({
          message: error.message,
          severity: "error",
        });
      }

      return true;
    },
    [validationError]
  );

  const handleNotificationChange = (newNotification) => {
    setNotification(newNotification);
    setIsSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setIsSnackbarOpen(false);
  };

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
      <NotificationSnackbar
        open={isSnackbarOpen}
        onClose={handleSnackbarClose}
        notification={notification}
      />
      {loading && <p>Loading...</p>}
      <SearchInput
        query={filterQuery}
        onQueryChange={handleFilterQueryChange}
      />

      <AddCategoryForm
        setCategories={setCategories}
        setNotification={handleNotificationChange}
      />

      <CategoriesTable
        categories={filteredCategories}
        onCategoryItemDelete={memoizedCategoryItemDeleteCallback}
        onSaveCategoryButtonClick={memoizedSaveCategoryButtonClickCallback}
      />
    </div>
  );
};

export default CategoryComponent;
