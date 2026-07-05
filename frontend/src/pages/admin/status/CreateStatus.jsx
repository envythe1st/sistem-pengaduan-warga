import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import DashboardLayout from "../../../components/layouts/DashboardLayout";

import { createStatus } from "../../../services/statusService";

export default function CreateStatus() {
  const navigate = useNavigate();

  const [namaStatus, setNamaStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createStatus({
        namaStatus,
      });

      toast.success("Status berhasil ditambahkan.");

      navigate("/admin/status");
    } catch (err) {
      console.error(err);

      toast.error("Gagal.");
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-sm p-8">
        <h1 className="text-3xl font-bold mb-8">Tambah Status</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            value={namaStatus}
            onChange={(e) => setNamaStatus(e.target.value)}
            className="w-full border rounded-xl px-4 py-3"
            placeholder="Nama Status"
          />

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="border px-6 py-3 rounded-xl"
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
