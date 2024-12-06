import { useState } from "react";

export const useCreateValidateUser = () => {
  const [validationCreateError, setValidationCreateError] = useState("");

  const validateCreateUser = (request) => {
    //UserName validation
    if (request.userName.trim().length < 3) {
      setValidationCreateError("The user name must be at least 3 letters long");
      return false;
    }
    if (request.userName.trim().length > 255) {
      setValidationCreateError(
        "The user name must be less then 255 letters long"
      );
      return false;
    }
    //Password validation
    const strongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;

    if (!strongPasswordRegex.test(request.password)) {
      setValidationCreateError(
        "The password must be at least 8 characters long, include an uppercase letter, a number, and a special character"
      );
      return false;
    }
    if (request.password.trim().length < 8) {
      setValidationCreateError("The password must be at least 8 letters long");
      return false;
    }
    if (request.password.trim().length > 100) {
      setValidationCreateError(
        "The password must be less then 100 letters long"
      );
      return false;
    }
    //Email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(request.email)) {
      setValidationCreateError("The email is not valid");
      return false;
    }
    setValidationCreateError("");
    return true;
  };
  return {
    validationCreateError,
    validateCreateUser,
  };
};
