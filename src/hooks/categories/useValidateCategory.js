import React, { useState } from "react";

export const useValidateCategory = () => {
  const errorsInitial = {
    name: "",
    description: "",
  };

  const [validationErrors, setValidationErrors] = useState(errorsInitial);

  const validateCategory = (name, description) => {
    if (
      name.trim().length < 3 ||
      name.trim().length > 255 ||
      description.trim().length < 5 ||
      description.trim().length > 1000
    ) {
      if (name.trim().length < 3) {
        setValidationErrors((prev) => {
          return {
            ...prev,
            name: "The category name must be at least 3 letters long",
          };
        });
      }
      if (name.trim().length > 255) {
        setValidationErrors((prev) => {
          return {
            ...prev,
            name: "The category name must be less then 255 letters long",
          };
        });
      }
      if (description.trim().length < 5) {
        setValidationErrors((prev) => {
          return {
            ...prev,
            description:
              "The category description must be at least 5 letters long",
          };
        });
      }
      if (description.trim().length > 1000) {
        setValidationErrors((prev) => {
          return {
            ...prev,
            description:
              "The category description must be less then 1000 letters long",
          };
        });
      }
      return false;
    }
    return true;
  };

  return {
    validationErrors,
    validateCategory,
  };
};
