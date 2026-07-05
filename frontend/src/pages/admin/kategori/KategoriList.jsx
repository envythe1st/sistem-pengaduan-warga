import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import DashboardLayout from "../../../components/layouts/DashboardLayout";

import {
  getAllKategori,
  deleteKategori,
} from "../../../services/kategoriService";

export default function KategoriList() {
  const [kategori, setKategori] = useState([]);

  const fetchKategori = async () => {
    try {
      const response = await getAllKategori();
      setKategori(response.data.data || []);
    } catch (err) {
      console.error(err);
      toast.error("Gagal memuat data kategori.");
    }
  };

  useEffect(() => {
    fetchKategori();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Yakin ingin menghapus kategori ini?");

    if (!confirmDelete) return;

    try {
      await deleteKategori(id);

      toast.success("Kategori berhasil dihapus.");

      fetchKategori();
    } catch (err) {
      console.error(err);
      toast.error("Gagal menghapus kategori.");
    }
  };

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Manajemen Kategori</h1>

          <p className="text-slate-500 mt-1">Kelola kategori laporan.</p>
        </div>

        <Link
          to="/admin/kategori/create"
          className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl transition"
        >
          + Tambah Kategori
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="text-left px-6 py-4">No</th>
              <th className="text-left px-6 py-4">Nama Kategori</th>
              <th className="text-center px-6 py-4">Aksi</th>
            </tr>
          </thead>

          <tbody>
            {kategori.length === 0 ? (
              <tr>
                <td colSpan={3} className="text-center py-10 text-slate-400">
                  Belum ada kategori.
                </td>
              </tr>
            ) : (
              kategori.map((item, index) => (
                <tr key={item.id} className="border-t hover:bg-slate-50">
                  <td className="px-6 py-4">{index + 1}</td>

                  <td className="px-6 py-4">{item.namaKategori}</td>

                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-4">
                      <Link
                        to={`/admin/kategori/${item.id}/edit`}
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
