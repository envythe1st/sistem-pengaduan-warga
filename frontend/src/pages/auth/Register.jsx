import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import LoginLeft from "../../components/auth/LoginLeft";
import RegisterForm from "../../components/auth/RegisterForm";

export default function Register() {
  return (
    <div className="relative min-h-screen grid lg:grid-cols-2">
      {/* Tombol kembali */}
      <Link
        to="/"
        className="
          absolute
          top-6
          left-6
          z-50
          flex
          items-center
          gap-2
          rounded-full
          bg-white/90
          backdrop-blur-md
          px-5
          py-2
          shadow-lg
          hover:scale-105
          transition
        "
      >
        <ArrowLeft size={20} />
        Beranda
      </Link>
      <LoginLeft />

      <div className="flex items-center justify-center p-8">
        <RegisterForm />
      </div>
    </div>
  );
}
