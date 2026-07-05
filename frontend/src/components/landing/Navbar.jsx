import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-md shadow-sm z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-4">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="Logo" className="w-16" />

          <div>
            <h1 className="font-bold text-2xl text-green-600">PENGADUAN</h1>

            <p className="text-sm text-gray-600">WARGA DESA</p>
          </div>
        </Link>

        <div className="hidden md:flex gap-10 font-medium">
          <a href="#">Beranda</a>

          <a href="#">Forum</a>

          <a href="#">Tentang</a>

          <a href="#">Cara Kerja</a>

          <a href="#">Kontak</a>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="px-8 py-3 border border-black rounded-xl hover:bg-gray-100 transition"
          >
            Masuk
          </Link>

          <Link
            to="/register"
            className="px-8 py-3 rounded-xl bg-green-600 text-white hover:bg-green-700 transition"
          >
            Daftar
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
