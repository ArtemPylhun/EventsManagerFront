import React from "react";
import TagTableRow from "./TagTableRow";
const TagsTable = ({ tags, onTagItemDelete, onSaveTagButtonClick }) => {
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
        {tags.map((tag) => (
          <TagTableRow
            key={tag.id}
            tag={tag}
            onTagDelete={onTagItemDelete}
            onSaveTagButtonClick={onSaveTagButtonClick}
          />
        ))}
      </tbody>
    </table>
  );
};

export default TagsTable;
