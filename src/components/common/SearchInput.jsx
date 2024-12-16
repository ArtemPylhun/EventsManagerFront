import React from "react";
import { TextField } from "@mui/material";

const SearchInput = ({ query, onQueryChange }) => {
  return (
    <TextField
      label="Search"
      variant="outlined"
      style={{ margin: "10px 0px" }}
      value={query}
      onChange={onQueryChange}
    />
  );
};

export default SearchInput;
