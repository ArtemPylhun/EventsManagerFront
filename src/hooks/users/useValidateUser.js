import { useState } from "react";

export const useValidateUser = () => {
  const errorsInitial = {
    userName: "",
    password: "",
    fullName: "",
    phoneNumber: "",
    address: "",
    birthDate: "",
  };

  const [userValidationErrors, setValidationErrors] = useState(errorsInitial);

  const validateUser = (request) => {
    if (
      request.userName &&
      (request.userName.trim().length < 3 ||
        request.userName.trim().length > 255)
    ) {
      if (request.userName.trim().length < 3) {
        setValidationErrors((prev) => {
          return {
            ...prev,
            userName: "The user name must be at least 3 letters long",
          };
        });
        return false;
      }
      if (request.userName.trim().length > 255) {
        setValidationErrors((prev) => {
          return {
            ...prev,
            userName: "The user name must be less then 255 letters long",
          };
        });
        return false;
      }
    }

    if (
      request.password &&
      (request.password.trim().length < 8 ||
        request.password.trim().length > 100)
    ) {
      const strongPasswordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;

      if (!strongPasswordRegex.test(request.password)) {
        setValidationErrors((prev) => {
          return {
            ...prev,
            password:
              "The password must be at least 8 characters long, include an uppercase letter, a number, and a special character",
          };
        });
        return false;
      }
      if (request.password.trim().length < 8) {
        setValidationErrors((prev) => {
          return {
            ...prev,
            password: "The password must be at least 8 letters long",
          };
        });
        return false;
      }
      if (request.password.trim().length > 100) {
        setValidationErrors((prev) => {
          return {
            ...prev,
            password: "The password must be less then 100 letters long",
          };
        });
        return false;
      }
    }
    if (request.fullName && request.fullName.trim().length === 0) {
      setValidationErrors((prev) => {
        return {
          ...prev,
          fullName: "The full name is required",
        };
      });
      return false;
    }

    const strongPhoneNumberRegex =
      /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;

    if (
      request.phoneNumber &&
      !strongPhoneNumberRegex.test(request.phoneNumber)
    ) {
      setValidationErrors((prev) => {
        return {
          ...prev,
          phoneNumber: "The phone number must be valid (e.g. +1 123-456-7890)",
        };
      });
      return false;
    }
    if (request.address && request.address.trim().length === 0) {
      setValidationErrors((prev) => {
        return {
          ...prev,
          address: "The address is required",
        };
      });
      return false;
    }

    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    const isValidDate = (dateString) => {
      const regEx = /^\d{4}-\d{2}-\d{2}$/;
      if (!dateString.match(regEx)) return false; // Invalid format
      const d = new Date(dateString);
      if (Number.isNaN(d.getTime())) return false; // Invalid date
      return d.toISOString().slice(0, 10) === dateString;
    };

    if (
      request.birthDate &&
      (!dateRegex.test(request.birthDate) || !isValidDate(request.birthDate))
    ) {
      setValidationErrors((prev) => {
        return {
          ...prev,
          birthDate:
            "The birth date must be valid and in the format YYYY-MM-DD",
        };
      });
      return false;
    }
    return true;
  };

  return {
    userValidationErrors,
    validateUser,
  };
};
