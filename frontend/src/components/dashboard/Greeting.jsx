import { useEffect, useState } from "react";
import { Info } from "lucide-react";

import { getMe } from "../../services/userService";

export default function Greeting() {
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

  return (
    <div>
      <h1 className="text-4xl font-bold text-slate-800">
        Selamat Datang, {user?.nama || "Warga"} 👋
      </h1>

      <p className="text-slate-500 mt-2">
        Pantau seluruh laporan yang telah diverifikasi oleh RW.
      </p>

      <div className="mt-6 flex gap-4 rounded-2xl border border-green-200 bg-green-50 p-5">
        <Info className="mt-1 text-green-600" />

        <div>
          <h3 className="font-semibold text-slate-800">Informasi</h3>

          <p className="mt-1 leading-7 text-slate-600">
            Semua laporan pada aplikasi ini merupakan laporan yang telah
            diverifikasi oleh RW berdasarkan aspirasi masyarakat. Warga dapat
            memantau, memberikan komentar, serta melihat perkembangan setiap
            laporan.
          </p>
        </div>
      </div>
    </div>
  );
}
