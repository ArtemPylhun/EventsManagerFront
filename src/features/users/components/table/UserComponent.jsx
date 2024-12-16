import React, { useState, useCallback } from "react";
import { Button, Container } from "@mui/material";
import UsersTable from "./UsersTable";
import SearchInput from "../../../../components/common/SearchInput";
import UserModal from "../UserModal";
import { UserService } from "../../services/user.service";
import { useUserDialogContext } from "../../../../contexts/userDialogContext/useUserDialogContext";
import { useNotifications } from "../../../../contexts/notifications/useNotifications";
import { useGetUsers } from "../../hooks/useGetUsers";
import LoaderComponent from "../../../../components/common/Loader";

const UserComponent = () => {
  const [filterQuery, setFilterQuery] = useState("");

  const { openDialog, userId, isOpen } = useUserDialogContext();
  const { showNotification } = useNotifications();
  const { users, loading, setUsers, turnOffLoading, turnOnLoading } =
    useGetUsers();

  const openCreateModal = () => {
    openDialog(null, ["email", "userName", "password"]);
  };

  const memoizedUserItemDeleteCallback = useCallback(async (id) => {
    try {
      turnOnLoading();

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

      turnOffLoading();
    } catch (error) {
      showNotification(error.message, {
        severity: "error",
        autoHideDuration: 5000,
      });
      turnOffLoading();
    }
  }, []);

  const handleFilterQueryChange = (event) => {
    setFilterQuery(event.target.value);
  };

  const filteredUsers =
    users?.filter((user) => {
      const query = filterQuery.toLowerCase();

      // Helper function to search recursively in nested objects
      const searchObject = (obj) => {
        return Object.values(obj).some((value) => {
          if (typeof value === "object" && value !== null) {
            return searchObject(value); // Recursive call for nested objects
          }
          return String(value).toLowerCase().includes(query);
        });
      };

      return searchObject(user);
    }) || [];

  return (
    <div>
      <SearchInput
        query={filterQuery}
        onQueryChange={handleFilterQueryChange}
      />
      <Container
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
          pr: 2,
        }}
      >
        <Button
          variant="contained"
          onClick={openCreateModal}
          sx={{
            fontSize: "1rem",
            padding: "10px 20px",
            borderRadius: "8px",
          }}
        >
          Add
        </Button>
      </Container>
      <LoaderComponent loading={loading}>
        <UsersTable
          users={filteredUsers}
          onUserItemDelete={memoizedUserItemDeleteCallback}
          onUserUpdate={setUsers}
        />
        {isOpen && userId === null && (
          <UserModal user={null} setUsers={setUsers} editMode={false} />
        )}
      </LoaderComponent>
    </div>
  );
};
export default UserComponent;
