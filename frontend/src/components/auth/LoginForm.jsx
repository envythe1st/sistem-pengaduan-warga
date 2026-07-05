import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";

import { login } from "../../services/authService";
import { saveToken } from "../../utils/token";

export default function LoginForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await login(form);

      // simpan token
      saveToken(response.data.data.token);

      // simpan data user
      localStorage.setItem("id", response.data.data.id);
      localStorage.setItem("nama", response.data.data.nama);
      localStorage.setItem("role", response.data.data.role);
      localStorage.setItem("email", response.data.data.email);

      toast.success("Login berhasil!");

      switch (response.data.data.role) {
        case "WARGA":
          navigate("/warga/dashboard");
          break;

        case "RW":
          navigate("/rw/dashboard");
          break;

        case "SUPER_ADMIN":
          navigate("/admin/dashboard");
          break;

        default:
          navigate("/");
          break;
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Email atau password salah.");
    }
  };

  return (
    <div className="w-full max-w-md">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-3xl shadow-2xl p-10"
      >
        <h1 className="text-4xl font-bold text-slate-800">Selamat Datang 👋</h1>

        <p className="text-slate-500 mt-2">Silakan masuk untuk melanjutkan.</p>

        {/* Email */}
        <div className="mt-8">
          <label className="text-sm font-medium text-slate-600">Email</label>

          <div className="mt-2 flex items-center border border-slate-200 rounded-xl px-4 py-3 focus-within:border-green-500 focus-within:ring-2 focus-within:ring-green-200 transition">
            <Mail size={20} className="text-slate-400" />

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Masukkan email..."
              className="ml-3 flex-1 outline-none"
              required
            />
          </div>
        </div>

        {/* Password */}
        <div className="mt-5">
          <label className="text-sm font-medium text-slate-600">Password</label>

          <div className="mt-2 flex items-center border border-slate-200 rounded-xl px-4 py-3 focus-within:border-green-500 focus-within:ring-2 focus-within:ring-green-200 transition">
            <Lock size={20} className="text-slate-400" />

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Masukkan password..."
              className="ml-3 flex-1 outline-none"
              required
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff size={20} className="text-slate-400" />
              ) : (
                <Eye size={20} className="text-slate-400" />
              )}
            </button>
          </div>
        </div>

        {/* Remember */}
        <div className="flex justify-between items-center mt-5">
          <label className="flex items-center gap-2 text-sm text-slate-600">
            <input type="checkbox" className="accent-green-600" />
            Ingat saya
          </label>

          <button
            type="button"
            className="text-green-600 hover:underline text-sm"
          >
            Lupa password?
          </button>
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full mt-8 rounded-xl bg-green-600 py-3 text-white font-semibold hover:bg-green-700 transition"
        >
          Masuk
        </button>

        <p className="text-center text-slate-500 mt-8">
          Belum punya akun?
          <Link
            to="/register"
            className="text-green-600 font-semibold ml-2 hover:underline"
          >
            Daftar
          </Link>
        </p>
      </form>
    </div>
  );
}
