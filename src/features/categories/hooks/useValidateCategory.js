import { useState } from "react";

export const useValidateCategory = () => {
  const [validationError, setValidationError] = useState("");

  const validateCategory = (name, description) => {
    // Validate name
    if (name.trim().length < 3) {
      setValidationError("The category name must be at least 3 letters long");
      return false;
    }
    if (name.trim().length > 255) {
      setValidationError(
        "The category name must be less than 255 letters long"
      );
      return false;
    }

    // Validate description
    if (description.trim().length < 5) {
      setValidationError(
        "The category description must be at least 5 letters long"
      );
      return false;
    }
    if (description.trim().length > 1000) {
      setValidationError(
        "The category description must be less than 1000 letters long"
      );
      return false;
    }

    setValidationError("");
    return true;
  };

  return {
    validationError,
    validateCategory,
  };
};
