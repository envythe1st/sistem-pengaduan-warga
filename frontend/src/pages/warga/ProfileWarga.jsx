import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { ArrowLeft } from "lucide-react";

import {
  User,
  Mail,
  Phone,
  MapPin,
  FileText,
  Clock,
  Camera,
  Pencil,
} from "lucide-react";

import DashboardLayout from "../../components/layouts/DashboardLayout";
import { getMe } from "../../services/userService";

export default function ProfileWarga() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getMe();
        setUser(response.data.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUser();
  }, []);

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
      {/* Header */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-green-600 hover:underline hover:translate-x-1 transition mb-6"
      >
        <ArrowLeft size={18} />
        Kembali
      </button>

      <h1 className="text-3xl font-bold">Profil Saya</h1>

      <p className="text-slate-500 mt-2">
        Informasi akun yang digunakan pada aplikasi Pengaduan Desa.
      </p>

      <div className="grid lg:grid-cols-3 gap-8 mt-8">
        {/* FOTO */}

        <div className="bg-white rounded-2xl shadow-sm p-8 h-fit">
          <h2 className="font-semibold text-lg mb-6">Foto Profil</h2>

          <div className="flex flex-col items-center">
            <div className="w-40 h-40 rounded-full overflow-hidden shadow-lg">
              {user.fotoProfil ? (
                <img
                  src={`http://localhost:8080/uploads/profile/${user.fotoProfil}?v=${user.updatedAt}`}
                  alt="Foto Profil"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-green-500 text-white text-6xl font-bold flex items-center justify-center">
                  {user.nama.charAt(0).toUpperCase()}
                </div>
              )}
            </div>

            <h2 className="mt-5 text-2xl font-bold">{user.nama}</h2>

            <span className="mt-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold">
              {user.namaRole}
            </span>

            <button className="mt-6 flex items-center gap-2 px-6 py-3 rounded-xl border hover:bg-slate-50 transition">
              <Camera size={18} />
              Lihat Foto
            </button>
          </div>
        </div>

        {/* INFORMASI */}

        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-8">
          <h2 className="text-xl font-bold mb-8">Informasi Pribadi</h2>

          <div className="space-y-7">
            <div>
              <div className="flex items-center gap-2 text-slate-500">
                <User size={18} />
                Nama Lengkap
              </div>

              <p className="font-semibold text-lg mt-2">{user.nama}</p>
            </div>

            <hr />

            <div>
              <div className="flex items-center gap-2 text-slate-500">
                <Mail size={18} />
                Email
              </div>

              <p className="font-semibold mt-2">{user.email}</p>
            </div>

            <hr />

            <div>
              <div className="flex items-center gap-2 text-slate-500">
                <Phone size={18} />
                Nomor HP
              </div>

              <p className="font-semibold mt-2">{user.noHp || "-"}</p>
            </div>

            <hr />

            <div className="border-b pb-5">
              <div className="flex items-center gap-2 text-slate-500 mb-2">
                <MapPin size={18} />
                <span>Alamat</span>
              </div>

              <p className="font-semibold">{user.alamat || "-"}</p>
            </div>

            <div>
              <div className="flex items-center gap-2 text-slate-500">
                <FileText size={18} />
                Bio
              </div>

              <p className="font-semibold mt-2 leading-7">
                {user.bio || "Belum ada bio."}
              </p>
            </div>

            <div>
              <div className="flex items-center gap-2 text-slate-500 mb-2">
                <Clock size={18} />
                <span>Terakhir diperbarui</span>
              </div>

              <p className="font-semibold">
                {user.updatedAt
                  ? new Date(user.updatedAt).toLocaleString("id-ID")
                  : "-"}
              </p>
            </div>
          </div>

          <div className="flex justify-end mt-10">
            <button
              onClick={() => navigate("/warga/profile/edit")}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl transition"
            >
              <Pencil size={18} />
              Edit Profil
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
