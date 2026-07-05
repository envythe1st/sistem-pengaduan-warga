import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import DashboardLayout from "../../../components/layouts/DashboardLayout";

import { getAllRole, deleteRole } from "../../../services/roleService";

export default function RoleList() {
  const [roles, setRoles] = useState([]);

  const fetchRole = async () => {
    try {
      const response = await getAllRole();
      setRoles(response.data.data || []);
    } catch (err) {
      console.error(err);
      toast.error("Gagal memuat data role.");
    }
  };

  useEffect(() => {
    fetchRole();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Yakin ingin menghapus role?")) return;

    try {
      await deleteRole(id);

      toast.success("Role berhasil dihapus.");

      fetchRole();
    } catch (err) {
      console.error(err);
      toast.error("Gagal menghapus role.");
    }
  };

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Manajemen Role</h1>

          <p className="text-slate-500">Kelola role pengguna.</p>
        </div>

        <Link
          to="/admin/role/create"
          className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl"
        >
          + Tambah Role
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="px-6 py-4 text-left">No</th>
              <th className="px-6 py-4 text-left">Nama Role</th>
              <th className="px-6 py-4 text-center">Aksi</th>
            </tr>
          </thead>

          <tbody>
            {roles.length === 0 ? (
              <tr>
                <td colSpan={3} className="text-center py-10 text-slate-400">
                  Belum ada role.
                </td>
              </tr>
            ) : (
              roles.map((item, index) => (
                <tr key={item.id} className="border-t hover:bg-slate-50">
                  <td className="px-6 py-4">{index + 1}</td>

                  <td className="px-6 py-4">{item.namaRole}</td>

                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-4">
                      <Link
                        to={`/admin/role/${item.id}/edit`}
                        className="text-yellow-600 hover:underline"
                      >
                        Edit
                      </Link>

                      <button
                        onClick={() => handleDelete(item.id)}
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
