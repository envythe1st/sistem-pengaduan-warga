import {
  LayoutDashboard,
  FileText,
  FolderOpen,
  ClipboardList,
  Shield,
  Users,
  LogOut,
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import logo from "../../../assets/images/logo.png";
import { removeToken } from "../../../utils/token";

export default function SidebarAdmin() {
  const navigate = useNavigate();

  const menus = [
    {
      name: "Dashboard",
      path: "/admin/dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    {
      name: "Semua Laporan",
      path: "/admin/laporan",
      icon: <FileText size={20} />,
    },
    {
      name: "Kategori",
      path: "/admin/kategori",
      icon: <FolderOpen size={20} />,
    },
    {
      name: "Status",
      path: "/admin/status",
      icon: <ClipboardList size={20} />,
    },
    {
      name: "Role",
      path: "/admin/role",
      icon: <Shield size={20} />,
    },
    {
      name: "User",
      path: "/admin/user",
      icon: <Users size={20} />,
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

          <p className="text-sm text-slate-500">Dashboard Admin</p>
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
