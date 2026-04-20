import { useEffect, useState } from "react";
import { useToast } from "@/context/ToastContext";
import { useLoading } from "@/context/LoadingContext";
import "./UsersPage.css";

type User = {
  id: number;
  name: string;
  email: string;
  created_at: string;
  modified_at: string;
};

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const { showToast } = useToast();
  const { setLoading } = useLoading();

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    try {
      setLoading(true);

      const res = await fetch("/api/users/", {
        credentials: "include",
      });

      if (!res.ok) throw new Error();

      const data = await res.json();
      setUsers(data);
    } catch {
      showToast("Error", "Failed to load users.", "error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h2 className="admin-title">Users</h2>
      <p className="num-users">{users.length} users found</p>

      <div className="users-table-wrapper">
        <table className="users-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Created</th>
              <th>Modified</th>
            </tr>
          </thead>

          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan={5} className="empty">
                  No users found.
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{new Date(user.created_at).toLocaleDateString()}</td>
                  <td>{new Date(user.modified_at).toLocaleDateString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
