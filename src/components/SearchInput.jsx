import React from "react";

const SearchInput = ({ query, onQueryChange }) => {
  return (
    <input
      placeholder="filter query"
      style={{ margin: "10px 0px" }}
      type="text"
      value={query}
      onChange={onQueryChange}
    />
  );
};

export default SearchInput;
