import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Camera,
  Lock,
  Eye,
  EyeOff,
  ArrowLeft,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import DashboardLayout from "../../components/layouts/DashboardLayout";
import {
  getMe,
  updateProfile,
  changePassword,
  uploadPhoto,
} from "../../services/userService";

export default function EditProfile() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [user, setUser] = useState(null);

  const [form, setForm] = useState({
    nama: "",
    email: "",
    noHp: "",
    alamat: "",
  });

  const [password, setPassword] = useState({
    passwordLama: "",
    passwordBaru: "",
    konfirmasiPassword: "",
  });

  const [loadingPassword, setLoadingPassword] = useState(false);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [imageVersion, setImageVersion] = useState(Date.now());

  const [loading, setLoading] = useState(false);

  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getMe();

        setUser(response.data.data);

        setForm({
          nama: response.data.data.nama || "",
          email: response.data.data.email || "",
          noHp: response.data.data.noHp || "",
          alamat: response.data.data.alamat || "",
        });
      } catch (err) {
        console.error(err);
      }
    };

    fetchUser();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    try {
      setLoading(true);

      await updateProfile({
        ...form,
        bio: user.bio,
        fotoProfil: user.fotoProfil,
      });

      toast.success("Profil berhasil diperbarui.");

      navigate("/warga/profile");
    } catch (err) {
      console.error(err);
      toast.error("Gagal memperbarui profil.");
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async () => {
    try {
      if (
        !password.passwordLama ||
        !password.passwordBaru ||
        !password.konfirmasiPassword
      ) {
        toast.warning("Semua field password harus diisi.");
        return;
      }

      if (password.passwordBaru !== password.konfirmasiPassword) {
        toast.warning("Konfirmasi password tidak sama.");
        return;
      }

      setLoadingPassword(true);

      await changePassword(password);

      toast.success("Password berhasil diubah.");

      setPassword({
        passwordLama: "",
        passwordBaru: "",
        konfirmasiPassword: "",
      });
    } catch (err) {
      console.error(err);

      toast.error(err.response?.data?.message || "Gagal mengubah password.");
    } finally {
      setLoadingPassword(false);
    }
  };

  const handleUploadPhoto = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    try {
      setUploadingPhoto(true);

      await uploadPhoto(file);

      const response = await getMe();

      setUser(response.data.data);

      setImageVersion(Date.now());

      toast.success("Foto profil berhasil diperbarui.");
    } catch (err) {
      console.error(err);

      toast.error("Gagal mengunggah foto.");
    } finally {
      setUploadingPhoto(false);
    }
  };

  if (!user) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-[70vh]">
          <div className="h-14 w-14 rounded-full border-b-4 border-green-600 animate-spin"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-green-600 hover:text-green-700 mb-6"
      >
        <ArrowLeft size={18} />
        Kembali
      </button>

      <h1 className="text-3xl font-bold">Edit Profil</h1>

      <p className="text-slate-500 mt-2">Perbarui informasi akun Anda.</p>

      <div className="grid lg:grid-cols-3 gap-8 mt-8">
        {/* FOTO */}

        <div className="bg-white rounded-2xl shadow-sm p-8 h-fit">
          <h2 className="font-bold text-xl mb-6">Foto Profil</h2>

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
                  {form.nama.charAt(0).toUpperCase()}
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => fileInputRef.current.click()}
              disabled={uploadingPhoto}
              className="mt-6 flex items-center gap-2 border border-green-600 text-green-600 px-6 py-3 rounded-xl hover:bg-green-50 disabled:opacity-50 transition"
            >
              <Camera size={18} />
              {uploadingPhoto ? "Mengunggah..." : "Ubah Foto"}
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleUploadPhoto}
            />
          </div>
        </div>

        {/* FORM */}

        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-8">
          <h2 className="text-2xl font-bold mb-8">Informasi Pribadi</h2>

          {/* Nama */}

          <label className="block mb-5">
            <div className="flex items-center gap-2 text-slate-600 mb-2">
              <User size={18} />
              Nama Lengkap
            </div>

            <input
              name="nama"
              value={form.nama}
              onChange={handleChange}
              className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-green-500"
            />
          </label>

          {/* Email */}

          <label className="block mb-5">
            <div className="flex items-center gap-2 text-slate-600 mb-2">
              <Mail size={18} />
              Email
            </div>

            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-green-500"
            />
          </label>

          {/* HP */}

          <label className="block mb-5">
            <div className="flex items-center gap-2 text-slate-600 mb-2">
              <Phone size={18} />
              Nomor HP
            </div>

            <input
              name="noHp"
              value={form.noHp}
              onChange={handleChange}
              className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-green-500"
            />
          </label>

          {/* Alamat */}

          <label className="block mb-5">
            <div className="flex items-center gap-2 text-slate-600 mb-2">
              <MapPin size={18} />
              Alamat
            </div>

            <input
              name="alamat"
              value={form.alamat}
              onChange={handleChange}
              className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-green-500"
            />
          </label>

          <div className="flex justify-end">
            <button
              onClick={handleSave}
              disabled={loading}
              className="bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white px-8 py-3 rounded-xl transition"
            >
              {loading ? "Menyimpan..." : "Simpan Perubahan"}
            </button>
          </div>
        </div>
      </div>

      {/* PASSWORD */}

      <div className="bg-white rounded-2xl shadow-sm p-8 mt-8">
        <h2 className="text-2xl font-bold flex items-center gap-2 mb-6">
          <Lock />
          Ubah Password
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Password Lama */}

          <div className="relative">
            <input
              type={showOld ? "text" : "password"}
              placeholder="Password Saat Ini"
              value={password.passwordLama}
              onChange={(e) =>
                setPassword({
                  ...password,
                  passwordLama: e.target.value,
                })
              }
              className="w-full border rounded-xl p-3 pr-12 outline-none focus:ring-2 focus:ring-green-500"
            />

            <button
              type="button"
              onClick={() => setShowOld(!showOld)}
              className="absolute right-4 top-4 text-slate-500"
            >
              {showOld ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Password Baru */}

          <div className="relative">
            <input
              type={showNew ? "text" : "password"}
              placeholder="Password Baru"
              value={password.passwordBaru}
              onChange={(e) =>
                setPassword({
                  ...password,
                  passwordBaru: e.target.value,
                })
              }
              className="w-full border rounded-xl p-3 pr-12 outline-none focus:ring-2 focus:ring-green-500"
            />

            <button
              type="button"
              onClick={() => setShowNew(!showNew)}
              className="absolute right-4 top-4 text-slate-500"
            >
              {showNew ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Konfirmasi */}

          <div className="relative">
            <input
              type={showConfirm ? "text" : "password"}
              placeholder="Konfirmasi Password"
              value={password.konfirmasiPassword}
              onChange={(e) =>
                setPassword({
                  ...password,
                  konfirmasiPassword: e.target.value,
                })
              }
              className="w-full border rounded-xl p-3 pr-12 outline-none focus:ring-2 focus:ring-green-500"
            />

            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-4 top-4 text-slate-500"
            >
              {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        <div className="flex justify-end mt-8">
          <button
            onClick={handleChangePassword}
            disabled={loadingPassword}
            className="bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white px-8 py-3 rounded-xl transition"
          >
            {loadingPassword ? "Mengubah..." : "Ubah Password"}
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}
