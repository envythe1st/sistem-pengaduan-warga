import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import { register } from "../../services/authService";

import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [form, setForm] = useState({
    nama: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      toast.error("Konfirmasi password tidak sama.");
      return;
    }

    try {
      const data = {
        nama: form.nama,
        email: form.email,
        password: form.password,

        // field tambahan dari backend
        noHp: "",
        fotoProfil: "",
        bio: "",
      };

      const response = await register(data);

      console.log(response);

      toast.success("Registrasi berhasil!");

      navigate("/login");
    } catch (err) {
      console.log(err);

      toast.error(err.response?.data?.message || "Registrasi gagal.");
    }
  };

  return (
    <div className="w-full max-w-[470px]">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-3xl shadow-2xl p-8"
      >
        <h1 className="text-4xl font-bold text-slate-800">
          Selamat Bergabung 🎉
        </h1>

        <p className="text-slate-500 mt-2">
          Buat akun baru untuk mulai menggunakan aplikasi.
        </p>

        {/* Nama */}
        <div className="mt-8">
          <label className="text-sm font-medium text-slate-600">
            Nama Lengkap
          </label>

          <div
            className="
            mt-2
            flex
            items-center
            border
            border-slate-200
            hover:border-green-300
            rounded-xl
            px-4
            py-3
            focus-within:border-green-500
            focus-within:ring-2
            focus-within:ring-green-200
            transition
          "
          >
            <User size={20} className="text-slate-400" />

            <input
              type="text"
              name="nama"
              value={form.nama}
              onChange={handleChange}
              placeholder="Masukkan nama lengkap..."
              className="ml-3 flex-1 outline-none"
            />
          </div>
        </div>

        {/* Email */}
        <div className="mt-5">
          <label className="text-sm font-medium text-slate-600">Email</label>

          <div
            className="
            mt-2
            flex
            items-center
            border
            border-slate-200
            hover:border-green-300
            rounded-xl
            px-4
            py-3
            focus-within:border-green-500
            focus-within:ring-2
            focus-within:ring-green-200
            transition
          "
          >
            <Mail size={20} className="text-slate-400" />

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Masukkan email..."
              className="ml-3 flex-1 outline-none"
            />
          </div>
        </div>

        {/* Password */}
        <div className="mt-5">
          <label className="text-sm font-medium text-slate-600">Password</label>

          <div
            className="
            mt-2
            flex
            items-center
            border
            border-slate-200
            hover:border-green-300
            rounded-xl
            px-4
            py-3
            focus-within:border-green-500
            focus-within:ring-2
            focus-within:ring-green-200
            transition
          "
          >
            <Lock size={20} className="text-slate-400" />

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Masukkan password..."
              className="ml-3 flex-1 outline-none"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-slate-400 hover:text-green-600 transition"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        {/* Konfirmasi Password */}
        <div className="mt-5">
          <label className="text-sm font-medium text-slate-600">
            Konfirmasi Password
          </label>

          <div
            className="
            mt-2
            flex
            items-center
            border
            border-slate-200
            hover:border-green-300
            rounded-xl
            px-4
            py-3
            focus-within:border-green-500
            focus-within:ring-2
            focus-within:ring-green-200
            transition
          "
          >
            <Lock size={20} className="text-slate-400" />

            <input
              type={showConfirm ? "text" : "password"}
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Ulangi password..."
              className="ml-3 flex-1 outline-none"
            />

            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="text-slate-400 hover:text-green-600 transition"
            >
              {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        {/* Button */}
        <button
          type="submit"
          className="
            w-full
            mt-8
            h-14
            rounded-xl
            bg-green-600
            text-white
            font-semibold
            hover:bg-green-700
            hover:scale-[1.02]
            active:scale-[0.98]
            transition-all
            duration-200
          "
        >
          Daftar Sekarang
        </button>

        {/* Login */}
        <p className="text-center text-slate-500 mt-8">
          Sudah punya akun?
          <Link
            to="/login"
            className="ml-2 text-green-600 font-semibold hover:underline"
          >
            Masuk
          </Link>
        </p>
      </form>
    </div>
  );
}
