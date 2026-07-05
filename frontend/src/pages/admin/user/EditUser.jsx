import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import DashboardLayout from "../../../components/layouts/DashboardLayout";

import { getUserById, updateUser } from "../../../services/userService";

import { getAllRole } from "../../../services/roleService";

export default function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [roles, setRoles] = useState([]);

  const [form, setForm] = useState({
    nama: "",
    email: "",
    bio: "",
    roleId: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [userResponse, roleResponse] = await Promise.all([
        getUserById(id),
        getAllRole(),
      ]);

      const user = userResponse.data.data;

      setForm({
        nama: user.nama,
        email: user.email,
        bio: user.bio || "",
        roleId: user.roleId,
      });

      setRoles(roleResponse.data.data || []);
    } catch (err) {
      console.error(err);
      toast.error("Gagal memuat data.");
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateUser(id, {
        ...form,
        roleId: Number(form.roleId),
      });

      toast.success("User berhasil diperbarui.");

      navigate("/admin/user");
    } catch (err) {
      console.error(err);
      toast.error("Gagal memperbarui user.");
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm p-8">
        <h1 className="text-3xl font-bold mb-8">Edit User</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2">Nama</label>

            <input
              type="text"
              name="nama"
              value={form.nama}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3"
            />
          </div>

          <div>
            <label className="block mb-2">Email</label>

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3"
            />
          </div>

          <div>
            <label className="block mb-2">Role</label>

            <select
              name="roleId"
              value={form.roleId}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3"
            >
              {roles.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.namaRole}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-2">Bio</label>

            <textarea
              rows={5}
              name="bio"
              value={form.bio}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3"
            />
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-6 py-3 rounded-xl border"
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
