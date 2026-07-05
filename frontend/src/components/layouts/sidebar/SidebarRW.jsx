import {
  LayoutDashboard,
  FileText,
  PlusCircle,
  User,
  LogOut,
} from "lucide-react";

import { NavLink, useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";

import logo from "../../../assets/images/logo.png";
import { removeToken } from "../../../utils/token";

export default function SidebarRW() {
  const navigate = useNavigate();
  const location = useLocation();

  const menus = [
    {
      name: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      path: "/rw/dashboard",
    },
    {
      name: "Buat Laporan",
      icon: <PlusCircle size={20} />,
      path: "/rw/laporan/create",
    },
    {
      name: "Laporan Saya",
      icon: <FileText size={20} />,
      path: "/rw/laporan/my",
    },
    {
      name: "Semua Laporan",
      icon: <FileText size={20} />,
      path: "/rw/laporan",
    },
    {
      name: "Profil",
      icon: <User size={20} />,
      path: "/rw/profile",
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

          <p className="text-sm text-slate-500">Dashboard RW</p>
        </div>
      </div>

      {/* Menu */}
      <div className="flex-1 px-5 py-8 space-y-2">
        {menus.map((menu) => {
          let active = false;

          switch (menu.path) {
            case "/rw/dashboard":
              active = location.pathname === "/rw/dashboard";
              break;

            case "/rw/laporan/create":
              active = location.pathname === "/rw/laporan/create";
              break;

            case "/rw/laporan/my":
              active =
                location.pathname === "/rw/laporan/my" ||
                location.pathname.startsWith("/rw/laporan/my/");
              break;

            case "/rw/laporan":
              active =
                location.pathname === "/rw/laporan" ||
                (location.pathname.startsWith("/rw/laporan/") &&
                  !location.pathname.includes("/edit") &&
                  !location.pathname.includes("/create") &&
                  !location.pathname.includes("/my"));
              break;

            case "/rw/profile":
              active = location.pathname.startsWith("/rw/profile");
              break;

            default:
              active = false;
          }

          return (
            <NavLink
              key={menu.name}
              to={menu.path}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 transition ${
                active
                  ? "bg-green-600 text-white shadow-md"
                  : "text-slate-600 hover:bg-green-50 hover:text-green-600"
              }`}
            >
              {menu.icon}
              <span>{menu.name}</span>
            </NavLink>
          );
        })}
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
