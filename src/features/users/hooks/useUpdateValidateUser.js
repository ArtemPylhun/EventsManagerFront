import { useState } from "react";

export const useUpdateValidateUser = () => {
  const [validationUpdateError, setValidationUpdateError] = useState("");

  const validateUpdateUser = (request) => {
    console.log("Validation request ", request);
    if (request.userName.trim().length < 3) {
      setValidationUpdateError("The user name must be at least 3 letters long");
      return false;
    }
    if (request.userName.trim().length > 255) {
      setValidationUpdateError(
        "The user name must be less then 255 letters long"
      );
      return false;
    }

    if (
      request.profile.fullName &&
      request.profile.fullName.trim().length === 0
    ) {
      setValidationUpdateError("The full name is required");
      return false;
    }

    const strongPhoneNumberRegex =
      /^\+?[0-9]{0,4}?[-.\s]?(\([0-9]{1,6}\)|[0-9]{1,6})[-.\s]?[0-9]{1,6}([-.\s]?[0-9]{1,6})?$/;

    if (
      request.profile.phoneNumber &&
      !strongPhoneNumberRegex.test(request.profile.phoneNumber)
    ) {
      setValidationUpdateError(
        "The phone number must be valid (e.g. +1 123-456-7890)"
      );
      return false;
    }
    if (
      request.profile.address &&
      request.profile.address.trim().length === 0
    ) {
      setValidationUpdateError("The address is required");
      return false;
    }

    const dateRegex = /^\d{2}\.\d{2}\.\d{4}$/;

    const isValidDate = (dateString) => {
      // Convert ISO string (if present) to DD.MM.YYYY
      const date = new Date(dateString);
      if (Number.isNaN(date.getTime())) {
        return false; // Invalid date
      }

      // Format the date to DD.MM.YYYY for validation
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
      const year = date.getFullYear();
      const formattedDate = `${day}.${month}.${year}`;

      // Validate against the regex
      if (!dateRegex.test(formattedDate)) {
        return false; // Invalid format
      }

      return true;
    };

    // Validation check
    if (request.profile.birthDate && !isValidDate(request.profile.birthDate)) {
      setValidationUpdateError(
        "The birth date must be valid and in the format DD.MM.YYYY"
      );
      return false;
    }

    return true;
  };

  return {
    validationUpdateError,
    validateUpdateUser,
  };
};
