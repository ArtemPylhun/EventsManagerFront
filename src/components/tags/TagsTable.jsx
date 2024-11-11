import React from "react";
import { useEditTag } from "../../hooks/tags/useEditTag";
import { TagService } from "../../services/tag.service";
const TagsTable = ({ tags, setTags, setError }) => {
  const {
    editTag,
    editErrors,
    onEditClick,
    handleEditTagChange,
    handleEditTagSave,
  } = useEditTag(setTags, setError);

  const onTagDelete = (id) => {
    const makeDeleteApiRequest = async (signal) => {
      try {
        await TagService.deleteTagById(id, signal);
        setTags((prev) => prev.filter((el) => el.id !== id));
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

  if (tags.length === 0) {
    return <p>No data</p>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {tags.map((tag) => {
          return editTag.id === tag.id ? (
            <tr key={tag.id}>
              <td>
                <input
                  name="title"
                  value={editTag.title}
                  onChange={handleEditTagChange}
                />
                {editErrors.title && (
                  <p style={{ color: "darkred", margin: "0" }}>
                    {editErrors.title}
                  </p>
                )}
              </td>
              <td>
                <button onClick={handleEditTagSave}>Save</button>
                <button onClick={() => onTagDelete(tag.id)}>Delete</button>
              </td>
            </tr>
          ) : (
            <tr key={tag.id}>
              <td>{tag.title}</td>
              <td>
                <button onClick={() => onEditClick(tag)}>Edit</button>
                <button onClick={() => onTagDelete(tag.id)}>Delete</button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default TagsTable;
