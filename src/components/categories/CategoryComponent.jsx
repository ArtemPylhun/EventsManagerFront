import { useEffect, useState, useCallback } from "react";
import React from "react";
import { CategoryService } from "../../services/category.service";
import CategoriesTable from "./CategoriesTable";
import SearchInput from "../SearchInput";
import AddCategoryForm from "./AddCategoryForm";

const CategoryComponent = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filterQuery, setFilterQuery] = useState("");

  useEffect(() => {
    let isMounted = true;
    const abortController = new AbortController();

    const fetchCategories = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await CategoryService.getAllCategories(
          abortController.signal
        );
        if (isMounted) {
          setCategories(response);
        }
      } catch (error) {
        setError(error.message);
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
            setError(error.response.data);
          } else {
            setError(error.message);
          }
        }
      };

      const abortController = new AbortController();
      await makeDeleteApiRequest(abortController.signal);

      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  }, []);

  const memoizedSaveCategoryButtonClickCallback = useCallback(
    async (editCategory) => {
      try {
        console.log(editCategory);
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
        await makeUpdateApiRequest();
      } catch (error) {
        setError(error.message);
      }
    },
    []
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
      {error && <p>Error: {error}</p>}
      {loading && <p>Loading...</p>}
      <h1>Categories List</h1>
      <SearchInput
        query={filterQuery}
        onQueryChange={handleFilterQueryChange}
      />

      <AddCategoryForm setCategories={setCategories} setError={setError} />

      <CategoriesTable
        categories={filteredCategories}
        onCategoryItemDelete={memoizedCategoryItemDeleteCallback}
        onSaveCategoryButtonClick={memoizedSaveCategoryButtonClickCallback}
      />
    </div>
  );
};

export default CategoryComponent;
