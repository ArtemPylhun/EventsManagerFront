export const useValidateCategory = () => {
  //const [validationError, return ] = useState("");

  const validateCategory = (name, description) => {
    // Validate name
    if (name.trim().length < 3) {
      return "The category name must be at least 3 letters long";
    }
    if (name.trim().length > 255) {
      return "The category name must be less than 255 letters long";
    }

    // Validate description
    if (description.trim().length < 5) {
      return "The category description must be at least 5 letters long";
    }
    if (description.trim().length > 1000) {
      return "The category description must be less than 1000 letters long";
    }

    return "";
  };

  return {
    validateCategory,
  };
};
