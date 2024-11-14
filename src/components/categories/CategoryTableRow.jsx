import { memo, useCallback, useMemo, useState } from "react";
import { useValidateCategory } from "../../hooks/categories/useValidateCategory";

const CategoryTableRowComponent = ({
  category,
  onCategoryDelete,
  onSaveCategoryButtonClick,
}) => {
  const { validationErrors, validateCategory } = useValidateCategory();

  const memoizedCategoryNameValue = useMemo(
    () => category.name,
    [category.name]
  );
  const memoizedCategoryDescriptionValue = useMemo(
    () => category.description,
    [category.description]
  );

  const [categoryName, setCategoryName] = useState(memoizedCategoryNameValue);
  const [categoryDescription, setCategoryDescription] = useState(
    memoizedCategoryDescriptionValue
  );

  const [isEditMode, setIsEditMode] = useState(false);

  const memoizedSetCategoryNameCallback = useCallback((event) => {
    setCategoryName(event.target.value);
  }, []);

  const memoizedSetCategoryDescriptionCallback = useCallback((event) => {
    setCategoryDescription(event.target.value);
  }, []);

  const memoizedSetIsEditModeCallback = useCallback(
    (isEdit) => {
      setIsEditMode(isEdit);
      if (!isEdit) {
        setCategoryName(memoizedCategoryNameValue);
        setCategoryDescription(memoizedCategoryDescriptionValue);
      }
    },
    [memoizedCategoryNameValue, memoizedCategoryDescriptionValue]
  );

  const memoizedSaveCategoryButtonClickCallback = useCallback(() => {
    if (validateCategory(categoryName, categoryDescription)) {
      onSaveCategoryButtonClick({
        id: category.id,
        name: categoryName,
        description: categoryDescription,
      });
      setIsEditMode(false);
    }
  }, [
    onSaveCategoryButtonClick,
    category.id,
    categoryName,
    categoryDescription,
  ]);

  const memoizedCategoryDeleteCallback = useCallback(() => {
    onCategoryDelete(category.id);
  }, [onCategoryDelete, category.id]);

  return (
    <tr key={category.id}>
      <td>
        {isEditMode ? (
          <div>
            <input
              name="name"
              value={categoryName}
              onChange={memoizedSetCategoryNameCallback}
            />
            {validationErrors.name && (
              <p style={{ color: "darkred", margin: "0" }}>
                {validationErrors.name}
              </p>
            )}
          </div>
        ) : (
          category.name
        )}
      </td>
      <td>
        {isEditMode ? (
          <div>
            <input
              name="description"
              value={categoryDescription}
              onChange={memoizedSetCategoryDescriptionCallback}
            />
            {validationErrors.description && (
              <p style={{ color: "darkred", margin: "0" }}>
                {validationErrors.description}
              </p>
            )}
          </div>
        ) : (
          category.description
        )}
      </td>
      <td>
        <div
          style={{
            display: "flex",
            gap: "1em",
          }}
        >
          {isEditMode ? (
            <button onClick={() => memoizedSaveCategoryButtonClickCallback()}>
              Save
            </button>
          ) : (
            <button onClick={() => memoizedSetIsEditModeCallback(true)}>
              Edit
            </button>
          )}
          {isEditMode ? (
            <button onClick={() => memoizedSetIsEditModeCallback(false)}>
              Cancel
            </button>
          ) : (
            <button onClick={memoizedCategoryDeleteCallback}>Delete</button>
          )}
        </div>
      </td>
    </tr>
  );
};

const CategoryTableRow = memo(CategoryTableRowComponent);

export default CategoryTableRow;
