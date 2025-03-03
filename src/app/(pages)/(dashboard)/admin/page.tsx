"use client";

import { useEffect, useState } from "react";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface User {
  id: number;
  email: string;
  username: string;
  role: string;
}

const AdminPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [newUser, setNewUser] = useState({ email: "", username: "", password: "", role: "user" });
  const [notification, setNotification] = useState<{ message: string; type: "success" | "error" | null }>({ message: "", type: null });

  useEffect(() => {
    if (status === "loading") return;
    if (!session || session.user.role !== "KepalaSekolah") {
      router.push("/");
    }
  }, [session, status, router]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/users");
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.error("Gagal mengambil data pengguna", error);
    }
  };

  const handleChangeRole = async (id: number, newRole: string) => {
    try {
      const res = await fetch(`/api/users`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, role: newRole }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Gagal mengubah role");
      }

      setUsers((prevUsers) =>
        prevUsers.map((user) => (user.id === id ? { ...user, role: newRole } : user))
      );

      setNotification({ message: "Update role berhasil!", type: "success" });
      setTimeout(() => setNotification({ message: "", type: null }), 3000);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await fetch(`/api/users?id=${id}`, { method: "DELETE" });
      fetchUsers();
      setNotification({ message: "User berhasil dihapus!", type: "error" });
      setTimeout(() => setNotification({ message: "", type: null }), 3000);
    } catch (error) {
      console.error("Gagal menghapus pengguna", error);
    }
  };

  const handleCreateUser = async () => {
    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });
      if (res.ok) {
        fetchUsers();
        setNewUser({ email: "", username: "", password: "", role: "user" });
        setNotification({ message: "User berhasil ditambahkan!", type: "success" });
        setTimeout(() => setNotification({ message: "", type: null }), 3000);
      }
    } catch (error) {
      console.error("Gagal menambahkan pengguna", error);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {notification.message && (
        <div className={`fixed top-10 left-1/2 transform -translate-x-1/2 p-4 rounded shadow-lg ${notification.type === "error" ? "bg-red-500 text-white" : "bg-green-500 text-white"}`}>
          {notification.message}
        </div>
      )}
      
      <div className="mb-6 p-4 border rounded shadow">
        <h2 className="text-xl font-bold mb-4">Tambah User</h2>
        <input type="text" placeholder="Username" value={newUser.username} onChange={(e) => setNewUser({ ...newUser, username: e.target.value })} className="border p-2 w-full mb-2 rounded" />
        <input type="text" placeholder="Email" value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} className="border p-2 w-full mb-2 rounded" />
        <input type="password" placeholder="Password" value={newUser.password} onChange={(e) => setNewUser({ ...newUser, password: e.target.value })} className="border p-2 w-full mb-2 rounded" />
        <select value={newUser.role} onChange={(e) => setNewUser({ ...newUser, role: e.target.value })} className="border p-2 w-full mb-2 rounded">
          <option value="user">User</option>
          <option value="admin">Admin</option>
          <option value="KepalaSekolah">Kepala Sekolah</option>
        </select>
        <button onClick={handleCreateUser} className="bg-blue-500 text-white p-2 rounded w-full">Tambah User</button>
      </div>

      <div className="overflow-x-auto">
        <h2 className="text-xl font-bold mb-4">Daftar Pengguna</h2>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Username</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Role</th>
              <th className="p-2 border">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b">
                <td className="p-2 border">{user.id}</td>
                <td className="p-2 border">{user.username}</td>
                <td className="p-2 border">{user.email}</td>
                <td className="p-2 border">
                  <select defaultValue={user.role} onChange={(e) => handleChangeRole(user.id, e.target.value)} className="border p-1 rounded">
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                    <option value="KepalaSekolah">Kepala Sekolah</option>
                  </select>
                </td>
                <td className="p-2 border">
                  <button onClick={() => handleDelete(user.id)} className="bg-red-500 text-white p-1 rounded">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPage;
