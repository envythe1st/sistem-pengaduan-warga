import { LayoutDashboard, FileText, User, LogOut } from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import logo from "../../../assets/images/logo.png";
import { removeToken } from "../../../utils/token";

export default function SidebarWarga() {
  const navigate = useNavigate();

  const menus = [
    {
      name: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      path: "/warga/dashboard",
    },
    {
      name: "Daftar Laporan",
      icon: <FileText size={20} />,
      path: "/warga/laporan",
    },
    {
      name: "Profil",
      icon: <User size={20} />,
      path: "/warga/profile",
    },
  ];

const handleLogout = () => {
  removeToken();

  localStorage.removeItem("role");
  localStorage.removeItem("email");

  toast.success("Berhasil logout 👋");

  navigate("/");
};

  return (
    <aside className="w-72 bg-white border-r shadow-sm flex flex-col">
      {/* Logo */}
      <div className="h-24 flex items-center gap-4 px-7 border-b">
        <img src={logo} alt="logo" className="w-12" />

        <div>
          <h1 className="font-bold text-xl text-green-600">Pengaduan Desa</h1>

          <p className="text-sm text-slate-500">Warga Desa Online</p>
        </div>
      </div>

      {/* Menu */}
      <div className="flex-1 px-5 py-8 space-y-2">
        {menus.map((menu) => (
          <NavLink
            key={menu.name}
            to={menu.path}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-4 py-3 transition ${
                isActive
                  ? "bg-green-600 text-white shadow-md"
                  : "text-slate-600 hover:bg-green-50 hover:text-green-600"
              }`
            }
          >
            {menu.icon}

            <span>{menu.name}</span>
          </NavLink>
        ))}
      </div>

      {/* Logout */}
      <div className="p-5 border-t">
        <button
          onClick={handleLogout}
          className="
            w-full
            flex
            items-center
            gap-3
            rounded-xl
            px-4
            py-3
            text-red-500
            hover:bg-red-50
            transition
          "
        >
          <LogOut size={20} />

          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
