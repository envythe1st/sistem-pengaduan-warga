import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  ArrowLeft,
  Search,
  ListFilter,
  Calendar,
  RotateCcw,
  Plus,
  Pencil,
} from "lucide-react";

import DashboardLayout from "../../components/layouts/DashboardLayout";
import { getMyLaporan } from "../../services/laporanService";

export default function MyLaporanRW() {
  const [laporan, setLaporan] = useState([]);
  const [search, setSearch] = useState("");
  const [kategori, setKategori] = useState("");
  const [status, setStatus] = useState("");
  const [tanggal, setTanggal] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchLaporan = async () => {
      try {
        const response = await getMyLaporan();
        setLaporan(response?.data?.data || []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchLaporan();
  }, []);

  const filtered = laporan.filter((item) => {
    const matchSearch = item.judul.toLowerCase().includes(search.toLowerCase());

    const matchKategori = kategori === "" || item.namaKategori === kategori;

    const matchStatus = status === "" || item.namaStatus === status;

    const matchTanggal =
      tanggal === "" || item.tanggalLaporan.substring(0, 10) === tanggal;

    return matchSearch && matchKategori && matchStatus && matchTanggal;
  });

  const getBadge = (status) => {
    switch (status) {
      case "MENUNGGU":
        return "bg-yellow-100 text-yellow-700";

      case "DIPROSES":
        return "bg-blue-100 text-blue-700";

      case "SELESAI":
        return "bg-green-100 text-green-700";

      case "DITOLAK":
        return "bg-red-100 text-red-700";

      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  return (
    <DashboardLayout>
      {/* HEADER */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-green-600 hover:text-green-700 hover:translate-x-1 transition mb-6"
          >
            <ArrowLeft size={18} />
            Kembali
          </button>

          <h1 className="text-4xl font-bold text-slate-800">Laporan Saya</h1>

          <p className="text-slate-500 mt-2">
            Kelola seluruh laporan yang telah Anda buat.
          </p>
        </div>

        <Link
          to="/rw/laporan/create"
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl transition"
        >
          <Plus size={18} />
          Buat Laporan
        </Link>
      </div>

      {/* CARD */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        {/* FILTER */}
        <div className="grid lg:grid-cols-12 gap-4 mb-8">
          <div className="relative lg:col-span-4">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              placeholder="Cari judul laporan..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border rounded-xl pl-11 pr-4 py-3 focus:ring-2 focus:ring-green-300 outline-none"
            />
          </div>

          <div className="relative lg:col-span-2">
            <ListFilter
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <select
              value={kategori}
              onChange={(e) => setKategori(e.target.value)}
              className="w-full border rounded-xl pl-11 pr-4 py-3 appearance-none"
            >
              <option value="">Semua Kategori</option>

              {[...new Set(laporan.map((x) => x.namaKategori))].map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div className="relative lg:col-span-2">
            <ListFilter
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full border rounded-xl pl-11 pr-4 py-3 appearance-none"
            >
              <option value="">Semua Status</option>
              <option value="MENUNGGU">Menunggu</option>
              <option value="DIPROSES">Diproses</option>
              <option value="SELESAI">Selesai</option>
              <option value="DITOLAK">Ditolak</option>
            </select>
          </div>

          <div className="relative lg:col-span-2">
            <Calendar
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="date"
              value={tanggal}
              onChange={(e) => setTanggal(e.target.value)}
              className="w-full border rounded-xl pl-11 pr-4 py-3"
            />
          </div>

          <button
            onClick={() => {
              setSearch("");
              setKategori("");
              setStatus("");
              setTanggal("");
            }}
            className="lg:col-span-2 flex items-center justify-center gap-2 bg-slate-200 hover:bg-slate-300 rounded-xl px-4 py-3 transition"
          >
            <RotateCcw size={18} />
            Reset
          </button>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr className="border-b">
                <th className="text-left py-4 px-2">Judul</th>
                <th className="text-left px-2">Kategori</th>
                <th className="text-left px-2">Lokasi</th>
                <th className="text-left px-2">Status</th>
                <th className="text-left px-2">Tanggal</th>
                <th className="text-left px-2">Aksi</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((item) => (
                <tr
                  key={item.id}
                  className="border-b hover:bg-slate-50 transition"
                >
                  <td className="py-4 px-2">{item.judul}</td>

                  <td className="px-2">{item.namaKategori}</td>

                  <td className="px-2">{item.lokasi}</td>

                  <td className="px-2">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getBadge(
                        item.namaStatus,
                      )}`}
                    >
                      {item.namaStatus}
                    </span>
                  </td>

                  <td className="px-2">
                    {new Date(item.tanggalLaporan).toLocaleDateString("id-ID")}
                  </td>

                  <td className="px-2">
                    <div className="flex items-center gap-4">
                      <Link
                        to={`/rw/laporan/${item.id}`}
                        className="text-green-600 hover:underline font-medium"
                      >
                        Detail
                      </Link>

                      {item.namaStatus === "MENUNGGU" && (
                        <Link
                          to={`/rw/laporan/${item.id}/edit`}
                          className="flex items-center gap-1 text-blue-600 hover:underline"
                        >
                          <Pencil size={15} />
                          Edit
                        </Link>
                      )}
                    </div>
                  </td>
                </tr>
              ))}

              {filtered.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center py-12 text-slate-500">
                    Tidak ada laporan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
