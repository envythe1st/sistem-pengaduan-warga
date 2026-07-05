import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import DashboardLayout from "../../../components/layouts/DashboardLayout";

import {
  getRoleById,
  updateRole,
} from "../../../services/roleService";

export default function EditRole() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [namaRole, setNamaRole] = useState("");

  useEffect(() => {
    fetchRole();
  }, []);

  const fetchRole = async () => {
    try {
      const response = await getRoleById(id);

      setNamaRole(response.data.data.namaRole);
    } catch (err) {
      console.error(err);
      toast.error("Gagal memuat data.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateRole(id, {
        namaRole,
      });

      toast.success("Role berhasil diperbarui.");

      navigate("/admin/role");
    } catch (err) {
      console.error(err);
      toast.error("Gagal memperbarui role.");
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-sm p-8">
        <h1 className="text-3xl font-bold mb-8">Edit Role</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2 font-medium">Nama Role</label>

            <input
              type="text"
              value={namaRole}
              onChange={(e) => setNamaRole(e.target.value)}
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
