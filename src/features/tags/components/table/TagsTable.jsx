import React from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";
import TagTableRow from "./TagTableRow";

const TagsTable = ({ tags, onTagItemDelete, onSaveTagButtonClick }) => {
  if (tags.length === 0) {
    return <p>No data</p>;
  }

  return (
    <TableContainer component={Paper} sx={{ marginY: "1rem" }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center">Title</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tags.map((tag) => (
            <TagTableRow
              key={tag.id}
              tag={tag}
              onTagDelete={onTagItemDelete}
              onTagUpdate={onSaveTagButtonClick}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TagsTable;
