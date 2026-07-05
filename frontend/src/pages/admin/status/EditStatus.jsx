import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import DashboardLayout from "../../../components/layouts/DashboardLayout";

import {
  getStatusById,
  updateStatusData,
} from "../../../services/statusService";

export default function EditStatus() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [namaStatus, setNamaStatus] = useState("");

  useEffect(() => {
    fetchStatus();
  }, []);

  const fetchStatus = async () => {
    try {
      const response = await getStatusById(id);

      setNamaStatus(response.data.data.namaStatus);
    } catch (err) {
      console.error(err);
      toast.error("Gagal memuat data.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateStatusData(id, {
        namaStatus,
      });

      toast.success("Status berhasil diperbarui.");

      navigate("/admin/status");
    } catch (err) {
      console.error(err);
      toast.error("Gagal memperbarui status.");
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-sm p-8">
        <h1 className="text-3xl font-bold mb-8">Edit Status</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2 font-medium">Nama Status</label>

            <input
              type="text"
              value={namaStatus}
              onChange={(e) => setNamaStatus(e.target.value)}
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
