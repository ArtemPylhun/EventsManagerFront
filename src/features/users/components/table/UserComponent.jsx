import React, { useEffect, useState, useCallback } from "react";
import { Button } from "@mui/material";
import UsersTable from "./UsersTable";
import SearchInput from "../../../../components/common/SearchInput";
import UserModal from "../UserModal";
import { UserService } from "../../services/user.service";
import { useUserDialogContext } from "../../../../contexts/userDialogContext/useUserDialogContext";
import { useNotifications } from "../../../../contexts/notifications/useNotifications";
import { useGetUsers } from "../../hooks/useGetUsers";

const UserComponent = () => {
  const [filterQuery, setFilterQuery] = useState("");
  const { openDialog, userId, isOpen } = useUserDialogContext();
  const { showNotification } = useNotifications();
  const { users, loading, setUsers, setLoading } = useGetUsers();

  const openCreateModal = () => {
    openDialog(null, ["email", "userName", "password"]);
  };

  const memoizedUserItemDeleteCallback = useCallback(async (id) => {
    try {
      setLoading(true);

      const makeDeleteApiRequest = async (signal) => {
        try {
          await UserService.deleteUserById(id, signal);
          setUsers((prev) => prev.filter((el) => el.id !== id));
          showNotification("User deleted successfully", {
            severity: "success",
            autoHideDuration: 5000,
          });
        } catch (error) {
          if (error.response && error.response.status === 409) {
            showNotification(error.response.data, {
              severity: "error",
              autoHideDuration: 5000,
            });
          } else {
            showNotification(error.message, {
              severity: "error",
              autoHideDuration: 5000,
            });
          }
        }
      };

      const abortController = new AbortController();
      await makeDeleteApiRequest(abortController.signal);

      setLoading(false);
    } catch (error) {
      showNotification(error.message, {
        severity: "error",
        autoHideDuration: 5000,
      });
      setLoading(false);
    }
  }, []);

  const handleFilterQueryChange = (event) => {
    setFilterQuery(event.target.value);
  };

  const filteredUsers =
    users?.filter((user) => {
      return Object.keys(user).some((key) => {
        if (key === "id") return false;
        return String(user[key])
          .toLowerCase()
          .includes(filterQuery.toLowerCase());
      });
    }) || [];

  return (
    <div>
      {loading && <p>Loading...</p>}
      <SearchInput
        query={filterQuery}
        onQueryChange={handleFilterQueryChange}
      />

      <Button onClick={openCreateModal}>Add User</Button>
      <UsersTable
        users={filteredUsers}
        onUserItemDelete={memoizedUserItemDeleteCallback}
        onUserUpdate={setUsers}
      />
      {isOpen && userId === null && (
        <UserModal user={null} setUsers={setUsers} editMode={false} />
      )}
    </div>
  );
};
export default UserComponent;
