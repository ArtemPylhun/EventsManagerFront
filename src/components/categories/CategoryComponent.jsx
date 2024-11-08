import { useEffect, useState } from "react";
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

  let categoryService = new CategoryService();

  useEffect(() => {
    let isMounted = true;
    const abortController = new AbortController();
    const signal = abortController.signal;
    categoryService = new CategoryService(signal);

    const fetchCategories = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await categoryService.getAllCategories();

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

  const handleFilterQueryChange = (event) => {
    setFilterQuery(event.target.value);
  };

  const filteredCategories = categories.filter((category) =>
    Object.keys(category).some((key) => {
      if (key === "id") return false;
      return String(category[key])
        .toLowerCase()
        .includes(filterQuery.toLowerCase());
    })
  );

  return (
    <div>
      {error && <p>Error: {error}</p>}
      {loading && <p>Loading...</p>}
      <h1>Categories List</h1>
      <SearchInput
        query={filterQuery}
        onQueryChange={handleFilterQueryChange}
      />

      <AddCategoryForm
        setCategories={setCategories}
        setError={setError}
        categoryService={categoryService}
      />

      <CategoriesTable
        categories={filteredCategories}
        setCategories={setCategories}
        categoryService={categoryService}
        setError={setError}
      />
    </div>
  );
};

export default CategoryComponent;
