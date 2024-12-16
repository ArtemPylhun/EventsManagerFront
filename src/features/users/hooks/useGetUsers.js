import { useState, useEffect } from "react";
import { UserService } from "../services/user.service";
import { useNotifications } from "../../../contexts/notifications/useNotifications";
import { useLoading } from "../../../hooks/useLoading";

export const useGetUsers = () => {
  const [users, setUsers] = useState([]);

  const { loading, turnOnLoading, turnOffLoading } = useLoading(false);
  const { showNotification } = useNotifications();

  const fetchUsers = async (signal) => {
    try {
      turnOnLoading();
      const response = await UserService.getAllUsers(signal);
      setUsers(response);
    } catch (error) {
      showNotification(error.message, {
        severity: "error",
        autoHideDuration: 5000,
      });
    } finally {
      turnOffLoading();
    }
  };

  useEffect(() => {
    const abortController = new AbortController();
    fetchUsers(abortController.signal);
    return () => abortController.abort();
  }, []);

  return {
    users,
    loading,
    setUsers,
    turnOnLoading,
    turnOffLoading,
    fetchUsers,
  };
};
