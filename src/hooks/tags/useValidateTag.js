import React, { useState } from "react";

export const useValidateTag = () => {
  const errorsInitial = {
    title: "",
  };

  const [tagValidationErrors, setTagValidationErrors] = useState(errorsInitial);

  const validateTag = (title) => {
    if (title.trim().length < 3 || title.trim().length > 255) {
      if (title.trim().length < 3) {
        setTagValidationErrors((prev) => {
          return {
            ...prev,
            title: "The tag title must be at least 3 letters long",
          };
        });
      }
      if (title.trim().length > 255) {
        setTagValidationErrors((prev) => {
          return {
            ...prev,
            title: "The tag title must be less then 255 letters long",
          };
        });
      }
      return false;
    }
    return true;
  };

  return {
    tagValidationErrors,
    validateTag,
  };
};
