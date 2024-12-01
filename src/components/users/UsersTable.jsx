import React from "react";
import { useState } from "react";
import UserTableRow from "./UserTableRow";
const UsersTable = ({ users, onUserItemDelete, onEditUserButtonClick }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleModalSave = (updatedUser) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
    setIsModalOpen(false);
  };

  if (users.length === 0) {
    return <p>No data</p>;
  }

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Fullname</th>
            <th>Phone number</th>
            <th>Address</th>
            <th>Birth date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <UserTableRow
              key={user.id}
              user={user}
              onUserDelete={onUserItemDelete}
              onEditUserButtonClick={handleEditUser}
            />
          ))}
        </tbody>
      </table>
      {selectedUser && (
        <UpdateUserModalForm
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          onSave={handleModalSave}
          user={selectedUser}
        />
      )}
    </>
  );
};

export default UsersTable;
