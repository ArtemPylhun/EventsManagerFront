import React, { useState } from "react";
import { UserService } from "../../services/user.service";
import { useValidateUser } from "../../hooks/users/useValidateUser";

const AddUserForm = ({ setUsers, setError }) => {
  const userInitial = {
    email: "",
    userName: "",
    password: "",
  };

  const [newUser, setNewUser] = useState(userInitial);
  let { userValidationErrors, validateUser } = useValidateUser();

  const onUserChange = (event) => {
    setNewUser({
      ...newUser,
      [event.target.name]: event.target.value,
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();

    if (validateUser(newUser)) {
      const makeCreateApiRequest = async () => {
        try {
          const abortController = new AbortController();
          const signal = abortController.signal;
          const response = await UserService.registerUser(newUser, signal);
          console.log(response);
          setUsers((prev) => [...prev, { ...newUser, id: response.id }]);
          setError("");
          setNewUser(userInitial);
        } catch (error) {
          console.log(error);
          if (error.response && error.response.status === 409) {
            setError(error.response.data);
          } else {
            setError(error.message);
          }
        }
      };

      makeCreateApiRequest();
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <input value={newUser.email} name="email" onChange={onUserChange} />
      {userValidationErrors.email && (
        <p style={{ color: "darkred" }}>{userValidationErrors.email}</p>
      )}
      <input value={newUser.userName} name="userName" onChange={onUserChange} />
      {userValidationErrors.userName && (
        <p style={{ color: "darkred" }}>{userValidationErrors.userName}</p>
      )}
      <input
        value={newUser.password}
        name="password"
        type="password"
        onChange={onUserChange}
      />
      {userValidationErrors.password && (
        <p style={{ color: "darkred" }}>{userValidationErrors.password}</p>
      )}
      <button style={{ margin: "0px 10px" }} type="submit">
        Add
      </button>
    </form>
  );
};

export default AddUserForm;
