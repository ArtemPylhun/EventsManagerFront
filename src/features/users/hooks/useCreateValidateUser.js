export const useCreateValidateUser = () => {
  const validateCreateUser = (request) => {
    //UserName validation
    if (request.userName.trim().length < 3) {
      return "The user name must be at least 3 letters long";
    }
    if (request.userName.trim().length > 255) {
      return "The user name must be less then 255 letters long";
    }
    //Password validation
    const strongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;

    if (!strongPasswordRegex.test(request.password)) {
      return "The password must be at least 8 characters long, include an uppercase letter, a number, and a special character";
    }
    if (request.password.trim().length < 8) {
      return "The password must be at least 8 letters long";
    }
    if (request.password.trim().length > 100) {
      return "The password must be less then 100 letters long";
    }
    //Email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(request.email)) {
      return "The email is not valid";
    }

    return "";
  };
  return {
    validateCreateUser,
  };
};
