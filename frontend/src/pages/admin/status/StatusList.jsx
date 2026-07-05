import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import DashboardLayout from "../../../components/layouts/DashboardLayout";

import { getAllStatus, deleteStatus } from "../../../services/statusService";

export default function StatusList() {
  const [status, setStatus] = useState([]);

  const fetchStatus = async () => {
    try {
      const response = await getAllStatus();
      setStatus(response.data.data || []);
    } catch (err) {
      console.error(err);
      toast.error("Gagal memuat data status.");
    }
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Yakin ingin menghapus status?")) return;

    try {
      await deleteStatus(id);

      toast.success("Status berhasil dihapus.");

      fetchStatus();
    } catch (err) {
      console.error(err);
      toast.error("Gagal menghapus status.");
    }
  };

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Manajemen Status</h1>

          <p className="text-slate-500">Kelola status laporan.</p>
        </div>

        <Link
          to="/admin/status/create"
          className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl"
        >
          + Tambah Status
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="px-6 py-4 text-left">No</th>
              <th className="px-6 py-4 text-left">Nama Status</th>
              <th className="px-6 py-4 text-center">Aksi</th>
            </tr>
          </thead>

          <tbody>
            {status.length === 0 ? (
              <tr>
                <td colSpan={3} className="text-center py-10 text-slate-400">
                  Belum ada data.
                </td>
              </tr>
            ) : (
              status.map((item, index) => (
                <tr key={item.id} className="border-t hover:bg-slate-50">
                  <td className="px-6 py-4">{index + 1}</td>

                  <td className="px-6 py-4">{item.namaStatus}</td>

                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-4">
                      <Link
                        to={`/admin/status/${item.id}/edit`}
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
