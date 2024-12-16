export const useValidateTag = () => {
  const validateTag = (title) => {
    if (title.trim().length < 3) {
      return "The tag title must be at least 3 letters long";
    }
    if (title.trim().length > 255) {
      return "The tag title must be less than 255 letters long";
    }
    return "";
  };
  return {
    validateTag,
  };
};
