import { Bell } from "lucide-react";

export default function Navbar() {
  return (
    <header className="bg-white h-20 shadow-sm flex items-center justify-between px-8">
      <div>
        <h2 className="text-2xl font-bold">Dashboard</h2>

        <p className="text-slate-500">Selamat datang kembali 👋</p>
      </div>

      <div className="flex items-center gap-5">
        <button
          className="
          relative
          w-11
          h-11
          rounded-full
          bg-green-50
          flex
          items-center
          justify-center
          hover:bg-green-100
        "
        >
          <Bell className="text-green-600" />

          <span
            className="
            absolute
            top-2
            right-2
            w-2
            h-2
            rounded-full
            bg-red-500
            "
          />
        </button>

        <img
          src="https://ui-avatars.com/api/?name=Raif"
          className="w-11 h-11 rounded-full"
        />
      </div>
    </header>
  );
}
