import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import DashboardLayout from "../../../components/layouts/DashboardLayout";

import {
  getKategoriById,
  updateKategori,
} from "../../../services/kategoriService";

export default function EditKategori() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [namaKategori, setNamaKategori] = useState("");

  useEffect(() => {
    fetchKategori();
  }, []);

  const fetchKategori = async () => {
    try {
      const response = await getKategoriById(id);

      setNamaKategori(response.data.data.namaKategori);
    } catch (err) {
      console.error(err);
      toast.error("Gagal memuat data.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateKategori(id, {
        namaKategori,
      });

      toast.success("Kategori berhasil diperbarui.");

      navigate("/admin/kategori");
    } catch (err) {
      console.error(err);
      toast.error("Gagal memperbarui kategori.");
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-sm p-8">
        <h1 className="text-3xl font-bold mb-8">Edit Kategori</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2 font-medium">Nama Kategori</label>

            <input
              type="text"
              value={namaKategori}
              onChange={(e) => setNamaKategori(e.target.value)}
              className="w-full border rounded-xl px-4 py-3"
            />
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-6 py-3 border rounded-xl"
            >
              Batal
            </button>

            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
