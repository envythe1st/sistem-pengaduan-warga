import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import DashboardLayout from "../../../components/layouts/DashboardLayout";

import { getAllUsers, deleteUser } from "../../../services/userService";

export default function UserList() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await getAllUsers();

      setUsers(response.data.data || []);
    } catch (err) {
      console.error(err);
      toast.error("Gagal memuat data user.");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Yakin ingin menghapus user ini?");

    if (!confirmDelete) return;

    try {
      await deleteUser(id);

      toast.success("User berhasil dihapus.");

      fetchUsers();
    } catch (err) {
      console.error(err);
      toast.error("Gagal menghapus user.");
    }
  };

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Manajemen User</h1>

          <p className="text-slate-500 mt-1">
            Kelola seluruh pengguna aplikasi.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="text-left px-6 py-4">No</th>
              <th className="text-left px-6 py-4">Nama</th>
              <th className="text-left px-6 py-4">Email</th>
              <th className="text-left px-6 py-4">Role</th>
              <th className="text-center px-6 py-4">Aksi</th>
            </tr>
          </thead>

          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-10 text-slate-400">
                  Belum ada data user.
                </td>
              </tr>
            ) : (
              users.map((user, index) => (
                <tr key={user.id} className="border-t hover:bg-slate-50">
                  <td className="px-6 py-4">{index + 1}</td>

                  <td className="px-6 py-4">{user.nama}</td>

                  <td className="px-6 py-4">{user.email}</td>

                  <td className="px-6 py-4">
                    <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
                      {user.namaRole}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-3">
                      <Link
                        to={`/admin/user/${user.id}`}
                        className="text-blue-600 hover:underline"
                      >
                        Detail
                      </Link>

                      <Link
                        to={`/admin/user/${user.id}/edit`}
                        className="text-yellow-600 hover:underline"
                      >
                        Edit
                      </Link>

                      <button
                        onClick={() => handleDelete(user.id)}
                        className="text-red-600 hover:underline"
                      >
                        Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}
