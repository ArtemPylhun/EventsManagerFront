import { useEffect, useState, useCallback } from "react";
import React from "react";
import { UserService } from "../../services/user.service";
import UsersTable from "./UsersTable";
import SearchInput from "../SearchInput";
import AddUserForm from "./AddUserForm";
const UserComponent = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filterQuery, setFilterQuery] = useState("");

  useEffect(() => {
    let isMounted = true;
    const abortController = new AbortController();

    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await UserService.getAllUsers(abortController.signal);
        if (isMounted) {
          setUsers(response);
          console.log(response);
        }
      } catch (error) {
        setError(error.message);
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
        } catch (error) {
          console.log(error);
          if (error.response && error.response.status === 409) {
            setError(error.response.data);
          } else {
            setError(error.message);
          }
        }
      };

      const abortController = new AbortController();
      await makeDeleteApiRequest(abortController.signal);

      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  }, []);

  const memoizedSaveUserButtonClickCallback = useCallback(async (editUser) => {
    try {
      const makeUpdateApiRequest = async () => {
        try {
          const abortController = new AbortController();
          const signal = abortController.signal;
          const response = await UserService.updateUser(editUser, signal);

          setUsers((prev) =>
            prev.map((el) => {
              if (el.id === editUser.id) {
                return editUser;
              }
              return el;
            })
          );
        } catch (error) {
          console.log(error);
          if (error.status === 409) {
            setError(error.response?.data);
          } else {
            setError(error.message);
          }
        }
      };
      await makeUpdateApiRequest();
    } catch (error) {
      setError(error.message);
    }
  }, []);

  const handleFilterQueryChange = (event) => {
    setFilterQuery(event.target.value);
  };

  const filteredUsers =
    users?.filter((user) => {
      if (filterQuery === "") return true;
      return Object.keys(user).some((key) => {
        if (key === "id") return false;
        return String(user[key])
          .toLowerCase()
          .includes(filterQuery.toLowerCase());
      });
    }) || [];

  return (
    <div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {loading && <p>Loading...</p>}
      <h1>Users List</h1>
      <SearchInput
        query={filterQuery}
        onQueryChange={handleFilterQueryChange}
      />
      <AddUserForm setUsers={setUsers} setError={setError} />
      <UsersTable
        users={filteredUsers}
        onUserItemDelete={memoizedUserItemDeleteCallback}
        onEditUserButtonClick={memoizedSaveUserButtonClickCallback}
      />
    </div>
  );
};
export default UserComponent;
