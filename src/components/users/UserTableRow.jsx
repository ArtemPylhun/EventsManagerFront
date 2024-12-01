import { memo, useCallback, useMemo, useState } from "react";
import { useValidateUser } from "../../hooks/users/useValidateUser";
import UpdateUserModalForm from "./UpdateUserModalForm";

// const UserTableRowComponent = ({
//   user,
//   onUserDelete,
//   onEditUserButtonClick,
// }) => {
//   const { validationErrors, validateUser } = useValidateUser();

//   const memoizedUserValues = useMemo(
//     () => ({
//       userName: user.userName || "",
//       fullName: user.profile.fullName || "",
//       phoneNumber: user.profile.phoneNumber || "",
//       address: user.profile.address || "",
//       birthDate: user.profile.birthDate || "",
//     }),
//     [user]
//   );

//   const [userValues, setUserValues] = useState(memoizedUserValues);
//   const [isEditMode, setIsEditMode] = useState(false);

//   const memoizedSetUserValuesCallback = useCallback(
//     (name) => (event) => {
//       setUserValues((prev) => ({
//         ...prev,
//         [name]: event.target.value,
//       }));
//     },
//     []
//   );

//   const memoizedSetIsEditModeCallback = useCallback(
//     (isEdit) => {
//       setIsEditMode(isEdit);
//       if (!isEdit) {
//         setUserValues(memoizedUserValues);
//       }
//     },
//     [memoizedUserValues]
//   );

//   const memoizedSaveUserButtonClickCallback = useCallback(() => {
//     if (validateUser(userValues)) {
//       onEditUserButtonClick({
//         id: user.id,
//         ...userValues,
//       });
//       setIsEditMode(false);
//     }
//   }, [onEditUserButtonClick, user.id, userValues]);

//   const memoizedUserDeleteCallback = useCallback(() => {
//     onUserDelete(user.id);
//   }, [onUserDelete, user.id]);

//   return (
//     <tr key={user.id}>
//       <td>
//         {isEditMode ? (
//           <input
//             name="userName"
//             value={userValues.userName}
//             onChange={memoizedSetUserValuesCallback("userName")}
//           />
//         ) : (
//           user.userName
//         )}
//       </td>
//       <td>
//         {isEditMode ? (
//           <input
//             name="fullName"
//             value={userValues.fullName}
//             onChange={memoizedSetUserValuesCallback("fullName")}
//           />
//         ) : (
//           user.profile.fullName
//         )}
//       </td>
//       <td>
//         {isEditMode ? (
//           <input
//             name="phoneNumber"
//             value={userValues.phoneNumber}
//             onChange={memoizedSetUserValuesCallback("phoneNumber")}
//           />
//         ) : (
//           user.profile.phoneNumber
//         )}
//       </td>
//       <td>
//         {isEditMode ? (
//           <input
//             name="address"
//             value={userValues.address}
//             onChange={memoizedSetUserValuesCallback("address")}
//           />
//         ) : (
//           user.profile.address
//         )}
//       </td>
//       <td>
//         {isEditMode ? (
//           <input
//             type="date"
//             name="birthDate"
//             value={userValues.birthDate}
//             onChange={memoizedSetUserValuesCallback("birthDate")}
//           />
//         ) : (
//           new Date(user.profile.birthDate).toUTCString()
//         )}
//       </td>
//       <td>
//         <div
//           style={{
//             display: "flex",
//             gap: "1em",
//           }}
//         >
//           {isEditMode ? (
//             <button onClick={memoizedSaveUserButtonClickCallback}>Save</button>
//           ) : (
//             <button onClick={() => memoizedSetIsEditModeCallback(true)}>
//               Edit
//             </button>
//           )}
//           {isEditMode ? (
//             <button onClick={() => memoizedSetIsEditModeCallback(false)}>
//               Cancel
//             </button>
//           ) : (
//             <button onClick={memoizedUserDeleteCallback}>Delete</button>
//           )}
//         </div>
//       </td>
//     </tr>
//   );
// };

// const UserTableRow = memo(UserTableRowComponent);

// export default UserTableRow;

const UserTableRowComponent = ({ user, onUserDelete, onUserUpdate }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const memoizedUserDeleteCallback = useCallback(() => {
    onUserDelete(user.id);
  }, [onUserDelete, user.id]);

  const handleEditClick = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleModalClose = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const handleModalSave = useCallback(
    (updatedUser) => {
      onUserUpdate(updatedUser);
      setIsModalOpen(false);
    },
    [onUserUpdate]
  );

  return (
    <>
      <tr key={user.id}>
        <td>{user.userName}</td>
        <td>{user.profile.fullName}</td>
        <td>{user.profile.phoneNumber}</td>
        <td>{user.profile.address}</td>
        <td>{new Date(user.profile.birthDate).toUTCString()}</td>
        <td>
          <div style={{ display: "flex", gap: "1em" }}>
            <button onClick={handleEditClick}>Edit</button>
            <button onClick={memoizedUserDeleteCallback}>Delete</button>
          </div>
        </td>
      </tr>
      {isModalOpen && (
        <UpdateUserModalForm
          isOpen={isModalOpen}
          onRequestClose={handleModalClose}
          initialUserData={user}
          onSave={handleModalSave}
        />
      )}
    </>
  );
};

const UserTableRow = memo(UserTableRowComponent);

export default UserTableRow;
