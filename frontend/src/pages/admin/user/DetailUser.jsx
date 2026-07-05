import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

import DashboardLayout from "../../../components/layouts/DashboardLayout";

import { ArrowLeft, User, Mail, Shield } from "lucide-react";

import { getUserById } from "../../../services/userService";

export default function DetailUser() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const response = await getUserById(id);

      setUser(response.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  if (!user) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-[60vh]">
          <div className="animate-spin rounded-full h-14 w-14 border-b-4 border-green-600"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-green-600 hover:underline mb-6"
      >
        <ArrowLeft size={18} />
        Kembali
      </button>

      <div className="bg-white rounded-2xl shadow-sm p-8">
        <div className="flex items-center gap-6">
          <img
            src={
              user.fotoProfil
                ? `http://localhost:8080/${user.fotoProfil}`
                : "https://ui-avatars.com/api/?name=" + user.nama
            }
            className="w-32 h-32 rounded-full object-cover border"
          />

          <div>
            <h1 className="text-3xl font-bold">{user.nama}</h1>

            <p className="text-slate-500 mt-1">ID User #{user.id}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
          <div className="bg-slate-50 rounded-xl p-6">
            <div className="flex items-center gap-2 text-slate-500">
              <User size={16} />
              Nama
            </div>

            <p className="font-semibold mt-2">{user.nama}</p>
          </div>

          <div className="bg-slate-50 rounded-xl p-6">
            <div className="flex items-center gap-2 text-slate-500">
              <Mail size={16} />
              Email
            </div>

            <p className="font-semibold mt-2">{user.email}</p>
          </div>

          <div className="bg-slate-50 rounded-xl p-6">
            <div className="flex items-center gap-2 text-slate-500">
              <Shield size={16} />
              Role
            </div>

            <p className="font-semibold mt-2">{user.namaRole}</p>
          </div>

          <div className="bg-slate-50 rounded-xl p-6">
            <p className="text-slate-500">Bio</p>

            <p className="font-semibold mt-2">{user.bio || "-"}</p>
          </div>
        </div>

        <div className="flex justify-end mt-8">
          <Link
            to={`/admin/user/${user.id}/edit`}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl"
          >
            Edit User
          </Link>
        </div>
      </div>
    </DashboardLayout>
  );
}
