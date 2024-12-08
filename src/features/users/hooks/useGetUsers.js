import { useState, useEffect } from "react";
import { UserService } from "../services/user.service";
import { useNotifications } from "../../../contexts/notifications/useNotifications";

export const useGetUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const { showNotification } = useNotifications();

  const fetchUsers = async (signal) => {
    try {
      setLoading(true);
      const response = await UserService.getAllUsers(signal);
      setUsers(response);
    } catch (error) {
      showNotification(error.message, {
        severity: "error",
        autoHideDuration: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const abortController = new AbortController();
    fetchUsers(abortController.signal);
    return () => abortController.abort();
  }, []);

  return { users, loading, setUsers, setLoading, fetchUsers };
};
