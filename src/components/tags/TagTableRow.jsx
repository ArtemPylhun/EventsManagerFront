import { memo, useCallback, useMemo, useState } from "react";
import { useValidateTag } from "../../hooks/tags/useValidateTag";

const TagTableRowComponent = ({ tag, onTagDelete, onSaveTagButtonClick }) => {
  const { tagValidationErrors, validateTag } = useValidateTag();
  console.log(tag);
  const memoizedTagTitleValue = useMemo(() => tag.title, [tag.title]);

  const [tagTitle, setTagTitle] = useState(memoizedTagTitleValue);

  const [isEditMode, setIsEditMode] = useState(false);

  const memoizedSetTagTitleCallback = useCallback((event) => {
    setTagTitle(event.target.value);
  }, []);

  const memoizedSetIsEditModeCallback = useCallback(
    (isEdit) => {
      setIsEditMode(isEdit);
      if (!isEdit) {
        setTagTitle(memoizedTagTitleValue);
      }
    },
    [memoizedTagTitleValue]
  );

  const memoizedSaveTagButtonClickCallback = useCallback(() => {
    if (validateTag(tagTitle)) {
      onSaveTagButtonClick({
        id: tag.id,
        title: tagTitle,
      });
      setIsEditMode(false);
    }
  }, [onSaveTagButtonClick, tag.id, tagTitle]);

  const memoizedTagDeleteCallback = useCallback(() => {
    onTagDelete(tag.id);
  }, [onTagDelete, tag.id]);

  return (
    <tr key={tag.id}>
      <td>
        {isEditMode ? (
          <div>
            <input
              name="title"
              value={tagTitle}
              onChange={memoizedSetTagTitleCallback}
            />
            {tagValidationErrors.title && (
              <p style={{ color: "darkred", margin: "0" }}>
                {tagValidationErrors.title}
              </p>
            )}
          </div>
        ) : (
          tag.title
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
            <button onClick={memoizedSaveTagButtonClickCallback}>Save</button>
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
            <button onClick={memoizedTagDeleteCallback}>Delete</button>
          )}
        </div>
      </td>
    </tr>
  );
};

const TagTableRow = memo(TagTableRowComponent);

export default TagTableRow;
