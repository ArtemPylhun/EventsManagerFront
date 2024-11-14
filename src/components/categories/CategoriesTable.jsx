import React from "react";
import CategoryTableRow from "./CategoryTableRow";
const CategoriesTable = ({
  categories,
  onCategoryItemDelete,
  onSaveCategoryButtonClick,
}) => {
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
        {categories.map((category) => (
          <CategoryTableRow
            key={category.id}
            category={category}
            onCategoryDelete={onCategoryItemDelete}
            onSaveCategoryButtonClick={onSaveCategoryButtonClick}
          />
        ))}
      </tbody>
    </table>
  );
};

export default CategoriesTable;
