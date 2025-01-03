import React, { useMemo } from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";
import CategoryTableRow from "./CategoryTableRow";

const CategoriesTable = ({
  categories,
  onCategoryItemDelete,
  onSaveCategoryButtonClick,
}) => {
  if (categories.length === 0) {
    return <p>No data</p>;
  }
  const memoizedRows = useMemo(
    () =>
      categories.map((category) => (
        <CategoryTableRow
          key={category.id}
          category={category}
          onCategoryDelete={onCategoryItemDelete}
          onCategoryUpdate={onSaveCategoryButtonClick}
        />
      )),
    [categories, onCategoryItemDelete, onSaveCategoryButtonClick]
  );

  return (
    <TableContainer component={Paper} sx={{ marginY: "1rem" }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center">Name</TableCell>
            <TableCell align="center">Description</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{memoizedRows}</TableBody>
      </Table>
    </TableContainer>
  );
};

export default CategoriesTable;
