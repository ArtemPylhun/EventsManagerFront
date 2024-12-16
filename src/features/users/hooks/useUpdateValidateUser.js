export const useUpdateValidateUser = () => {
  const validateUpdateUser = (request) => {
    if (request.userName.trim().length < 3) {
      return "The user name must be at least 3 letters long";
    }
    if (request.userName.trim().length > 255) {
      return "The user name must be less then 255 letters long";
    }

    if (
      request.profile.fullName &&
      request.profile.fullName.trim().length < 6
    ) {
      return "The full name must be at least 6 letters long";
    }

    const ukrainianPhoneNumberRegex =
      /^\+38\s?(0\d{2})\s?(\d{3})\s?(\d{2})\s?(\d{2})$/;

    if (
      request.profile.phoneNumber &&
      !ukrainianPhoneNumberRegex.test(request.profile.phoneNumber)
    ) {
      return "The phone number must be a valid Ukrainian number (e.g., +38 096 620 12 12)";
    }
    if (
      request.profile.address &&
      request.profile.address.trim().length === 0
    ) {
      return "The address is required";
    }

    const isValidDate = (dateString) => {
      const limitDateTime = new Date("2008-12-15T23:49:30");

      if (new Date(dateString) >= limitDateTime) {
        return {
          isValid: false,
          message: "The birth date must be lower than 15.12.2008",
        };
      }
      return { isValid: true };
    };

    if (request.profile.birthDate) {
      const validation = isValidDate(request.profile.birthDate);
      if (!validation.isValid) {
        return validation.message;
      }
    }

    return "";
  };

  return {
    validateUpdateUser,
  };
};
