import React, { useState } from "react";

export const useValidateTag = () => {
  const [validationError, setValidationError] = useState("");

  const validateTag = (title) => {
    if (title.trim().length < 3) {
      setValidationError("The tag title must be at least 3 letters long");
      return false;
    }
    if (title.trim().length > 255) {
      setValidationError("The tag title must be less than 255 letters long");
      return false;
    }
    setValidationError("");
    return true;
  };
  return {
    validationError,
    validateTag,
  };
};
