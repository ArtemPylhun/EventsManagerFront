import { TextField } from "@mui/material";
import React from "react";

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
