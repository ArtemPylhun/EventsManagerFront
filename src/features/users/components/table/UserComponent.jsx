import React, { useEffect, useState, useCallback } from "react";
import { UserService } from "../../services/user.service";
import UsersTable from "./UsersTable";
import SearchInput from "../../../../components/common/SearchInput";
import AddUserModal from "../AddUserModal";
import { useUpdateValidateUser } from "../../hooks/useUpdateValidateUser";
import { useCreateValidateUser } from "../../hooks/useCreateValidateUser";
import { useNotifications } from "../../../../contexts/notifications/useNotifications";
import { Button } from "@mui/material";

const UserComponent = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterQuery, setFilterQuery] = useState("");
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);

  const { validateUpdateUser, validationUpdateError } = useUpdateValidateUser();
  const { validateCreateUser, validationCreateError } = useCreateValidateUser();
  const { showNotification } = useNotifications();
  const openModal = () => {
    setCreateModalOpen(true);
  };

  const closeModal = () => {
    setCreateModalOpen(false);
  };

  useEffect(() => {
    let isMounted = true;
    const abortController = new AbortController();

    const fetchUsers = async () => {
      try {
        setLoading(true);

        const response = await UserService.getAllUsers(abortController.signal);
        if (isMounted) {
          setUsers(response);
        }
      } catch (error) {
        showNotification(error.message, {
          severity: "error",
          autoHideDuration: 5000,
        });
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();

    return () => {
      isMounted = false;
      abortController.abort();
    };
  }, []);

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

  const memoizedSaveUserButtonClickCallback = useCallback(
    async (editUser) => {
      console.log(editUser);
      const isValid = validateUpdateUser(editUser);
      console.log(validationUpdateError);
      if (!isValid) {
        showNotification(validationUpdateError, {
          severity: "error",
          autoHideDuration: 5000,
        });
        return false;
      }
      try {
        const { password, ...userWithoutPassword } = editUser;
        const makeUpdateApiRequest = async () => {
          try {
            const abortController = new AbortController();
            const signal = abortController.signal;
            const response = await UserService.updateUser(
              userWithoutPassword,
              signal
            );

            setUsers((prev) =>
              prev.map((el) => {
                if (el.id === userWithoutPassword.id) {
                  return userWithoutPassword;
                }
                return el;
              })
            );
            showNotification("User updated successfully", {
              severity: "success",
              autoHideDuration: 5000,
            });
          } catch (error) {
            if (error.status === 409) {
              showNotification(error.response?.data, {
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
        await makeUpdateApiRequest();
      } catch (error) {
        showNotification(error.message, {
          severity: "error",
          autoHideDuration: 5000,
        });
      }
      return true;
    },
    [validationUpdateError]
  );

  const memoizedAddUserButtonClickCallback = useCallback(
    async (newUser) => {
      const isValid = validateCreateUser(newUser);
      if (!isValid) {
        showNotification(validationCreateError, {
          severity: "error",
          autoHideDuration: 5000,
        });
        return false;
      }
      try {
        const makeCreateApiRequest = async () => {
          try {
            const abortController = new AbortController();
            const signal = abortController.signal;
            const response = await UserService.registerUser(newUser, signal);

            setUsers((prev) => [...prev, { ...newUser, id: response.id }]);
            closeModal();
            showNotification("User created successfully", {
              severity: "success",
              autoHideDuration: 5000,
            });
          } catch (error) {
            if (error.response && error.response.status === 409) {
              showNotification(error.response?.data, {
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
        await makeCreateApiRequest();
      } catch (error) {
        showNotification(error.message, {
          severity: "error",
          autoHideDuration: 5000,
        });
      }

      return true;
    },
    [validationCreateError]
  );

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
      <Button onClick={openModal}>Add User</Button>
      <AddUserModal
        open={isCreateModalOpen}
        onClose={closeModal}
        onSave={memoizedAddUserButtonClickCallback}
      />
      <UsersTable
        users={filteredUsers}
        onUserItemDelete={memoizedUserItemDeleteCallback}
        onSaveUserButtonClick={memoizedSaveUserButtonClickCallback}
      />
    </div>
  );
};
export default UserComponent;
