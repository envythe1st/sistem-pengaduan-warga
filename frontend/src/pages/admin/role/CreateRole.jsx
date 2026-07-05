import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import DashboardLayout from "../../../components/layouts/DashboardLayout";

import { createRole } from "../../../services/roleService";

export default function CreateRole() {
  const navigate = useNavigate();

  const [namaRole, setNamaRole] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createRole({
        namaRole,
      });

      toast.success("Role berhasil ditambahkan.");

      navigate("/admin/role");
    } catch (err) {
      console.error(err);

      toast.error("Gagal menambahkan role.");
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-sm p-8">
        <h1 className="text-3xl font-bold mb-8">Tambah Role</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            value={namaRole}
            onChange={(e) => setNamaRole(e.target.value)}
            className="w-full border rounded-xl px-4 py-3"
            placeholder="Nama Role"
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
