// import React, { useState } from "react";
// import { UserService } from "../../services/user.service";
// import { useValidateUser } from "../../hooks/users/useValidateUser";
// import Modal from "react-modal";

// const UpdateUserModalForm = ({
//   setUsers,
//   setError,
//   isOpen,
//   onRequestClose,
// }) => {
//   const userInitial = {
//     userName: "",
//     password: "",
//     fullName: "",
//     phoneNumber: "",
//     address: "",
//     birthDate: new Date(),
//   };

//   const [newUser, setNewUser] = useState(userInitial);
//   let { userValidationErrors, validateUser } = useValidateUser();

//   const onUserChange = (event) => {
//     setNewUser({
//       ...newUser,
//       [event.target.name]: event.target.value,
//     });
//   };

//   const onSubmit = (event) => {
//     event.preventDefault();

//     if (validateUser(newUser)) {
//       const makeUpdateApiRequest = async () => {
//         try {
//           const abortController = new AbortController();
//           const signal = abortController.signal;
//           const response = await UserService.updateUser(newUser, signal);
//           setUsers((prev) =>
//             prev.map((user) =>
//               user.id === newUser.id ? { ...newUser, id: response.id } : user
//             )
//           );
//           setNewUser(userInitial);
//           onRequestClose();
//         } catch (error) {
//           console.log(error);
//           if (error.response && error.response.status === 409) {
//             setError(error.response.data);
//           } else {
//             setError(error.message);
//           }
//         }
//       };

//       makeUpdateApiRequest();
//     }
//   };

//   return (
//     <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
//       <form onSubmit={onSubmit}>
//         <label>
//           UserName:
//           <input
//             type="text"
//             value={newUser.userName}
//             onChange={onUserChange}
//             name="userName"
//             required
//           />
//           {userValidationErrors.userName && (
//             <p style={{ color: "darkred" }}>{userValidationErrors.userName}</p>
//           )}
//         </label>
//         <label>
//           Password:
//           <input
//             type="password"
//             value={newUser.password}
//             onChange={onUserChange}
//             name="password"
//             required
//           />
//           {userValidationErrors.password && (
//             <p style={{ color: "darkred" }}>{userValidationErrors.password}</p>
//           )}
//         </label>
//         <label>
//           FullName:
//           <input
//             type="text"
//             value={newUser.profile.fullName}
//             onChange={onUserChange}
//             name="fullName"
//             required
//           />
//           {userValidationErrors.fullName && (
//             <p style={{ color: "darkred" }}>{userValidationErrors.fullName}</p>
//           )}
//         </label>
//         <label>
//           PhoneNumber:
//           <input
//             type="text"
//             value={newUser.profile.phoneNumber}
//             onChange={onUserChange}
//             name="phoneNumber"
//             required
//           />
//           {userValidationErrors.phoneNumber && (
//             <p style={{ color: "darkred" }}>
//               {userValidationErrors.phoneNumber}
//             </p>
//           )}
//         </label>
//         <label>
//           Address:
//           <input
//             type="text"
//             value={newUser.profile.address}
//             onChange={onUserChange}
//             name="address"
//             required
//           />
//           {userValidationErrors.address && (
//             <p style={{ color: "darkred" }}>{userValidationErrors.address}</p>
//           )}
//         </label>
//         <label>
//           BirthDate:
//           <input
//             type="date"
//             value={newUser.profile.birthDate}
//             onChange={onUserChange}
//             name="birthDate"
//             required
//           />
//           {userValidationErrors.birthDate && (
//             <p style={{ color: "darkred" }}>{userValidationErrors.birthDate}</p>
//           )}
//         </label>
//         <button type="submit">Update</button>
//       </form>
//     </Modal>
//   );
// };

// export default UpdateUserModalForm;

import React, { useState, useCallback, useMemo } from "react";
import Modal from "react-modal";
import { useValidateUser } from "../../hooks/users/useValidateUser";

const UpdateUserModalForm = ({
  isOpen,
  onRequestClose,
  initialUserData,
  onSave,
}) => {
  const { validateUser, userValidationErrors } = useValidateUser();

  const memoizedInitialUserData = useMemo(
    () => ({
      userName: initialUserData.userName || "",
      fullName: initialUserData.profile.fullName || "",
      phoneNumber: initialUserData.profile.phoneNumber || "",
      address: initialUserData.profile.address || "",
      birthDate:
        initialUserData.profile.birthDate ||
        new Date().toISOString().split("T")[0],
    }),
    [initialUserData]
  );

  const [userData, setUserData] = useState(memoizedInitialUserData);

  const handleInputChange = useCallback((event) => {
    const { name, value } = event.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSaveClick = useCallback(() => {
    if (validateUser(userData)) {
      onSave({ id: initialUserData.id, ...userData });
    }
  }, [onSave, validateUser, userData, initialUserData.id]);

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <form>
        <label>
          UserName:
          <input
            type="text"
            name="userName"
            value={userData.userName}
            onChange={handleInputChange}
            required
          />
          {userValidationErrors.userName && (
            <p style={{ color: "darkred" }}>{userValidationErrors.userName}</p>
          )}
        </label>
        <label>
          FullName:
          <input
            type="text"
            name="fullName"
            value={userData.fullName}
            onChange={handleInputChange}
            required
          />
          {userValidationErrors.fullName && (
            <p style={{ color: "darkred" }}>{userValidationErrors.fullName}</p>
          )}
        </label>
        <label>
          PhoneNumber:
          <input
            type="text"
            name="phoneNumber"
            value={userData.phoneNumber}
            onChange={handleInputChange}
            required
          />
          {userValidationErrors.phoneNumber && (
            <p style={{ color: "darkred" }}>
              {userValidationErrors.phoneNumber}
            </p>
          )}
        </label>
        <label>
          Address:
          <input
            type="text"
            name="address"
            value={userData.address}
            onChange={handleInputChange}
            required
          />
          {userValidationErrors.address && (
            <p style={{ color: "darkred" }}>{userValidationErrors.address}</p>
          )}
        </label>
        <label>
          BirthDate:
          <input
            type="date"
            name="birthDate"
            value={userData.birthDate}
            onChange={handleInputChange}
            required
          />
          {userValidationErrors.birthDate && (
            <p style={{ color: "darkred" }}>{userValidationErrors.birthDate}</p>
          )}
        </label>
        <button type="button" onClick={handleSaveClick}>
          Save
        </button>
        <button type="button" onClick={onRequestClose}>
          Cancel
        </button>
      </form>
    </Modal>
  );
};

export default UpdateUserModalForm;
