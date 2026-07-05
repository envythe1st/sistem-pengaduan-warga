import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { ArrowLeft, MapPin, User, Calendar, Tag, Image } from "lucide-react";

import DashboardLayout from "../../../components/layouts/DashboardLayout";
import toast from "react-hot-toast";

import {
  getLaporanById,
  getFotoByLaporan,
  updateStatus,
} from "../../../services/laporanService";
import KomentarList from "../../../components/laporan/KomentarList";


import { getAllStatus } from "../../../services/statusService";

export default function DetailLaporan() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [laporan, setLaporan] = useState(null);
  const [fotoList, setFotoList] = useState([]);
  const [statusList, setStatusList] = useState([]);
  const [statusId, setStatusId] = useState("");

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const [laporanResponse, fotoResponse, statusResponse] =
          await Promise.all([
            getLaporanById(id),
            getFotoByLaporan(id),
            getAllStatus(),
          ]);

        const data = laporanResponse.data.data;

        setLaporan(data);
        setStatusId(data.statusId);

        setFotoList(fotoResponse.data.data || []);
        setStatusList(statusResponse.data.data || []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchDetail();
  }, [id]);

  if (!laporan) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-[60vh]">
          <div className="animate-spin rounded-full h-14 w-14 border-b-4 border-green-600"></div>
        </div>
      </DashboardLayout>
    );
  }

  const formatTanggal = (tanggal) => {
    return new Date(tanggal).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const statusColor = {
    MENUNGGU: "bg-yellow-100 text-yellow-700",
    DIPROSES: "bg-blue-100 text-blue-700",
    SELESAI: "bg-green-100 text-green-700",
    DITOLAK: "bg-red-100 text-red-700",
  };

  const statusDescription = {
    MENUNGGU: "Laporan sedang menunggu verifikasi RW.",
    DIPROSES: "Laporan sedang dalam proses penanganan.",
    SELESAI: "Laporan telah berhasil diselesaikan.",
    DITOLAK: "Laporan ditolak oleh pihak RW.",
  };

  const handleUpdateStatus = async () => {
    try {
      await updateStatus(laporan.id, Number(statusId));

      toast.success("Status berhasil diperbarui.");

      const response = await getLaporanById(id);

      setLaporan(response.data.data);
      setStatusId(response.data.data.statusId);
    } catch (err) {
      console.error(err);

      toast.error("Gagal memperbarui status.");
    }
  };

  return (
    <DashboardLayout>
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-green-600 hover:underline hover:translate-x-1 transition mb-6"
      >
        <ArrowLeft size={18} />
        Kembali
      </button>

      <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition duration-300 p-8">
        <h1 className="text-4xl font-bold tracking-tight">{laporan.judul}</h1>

        <p className="text-slate-500 mt-2">ID Laporan #{laporan.id}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {/* Status */}
          <div className="bg-slate-50 rounded-xl p-6 transition hover:bg-white hover:shadow-md">
            <div className="flex items-center gap-2 text-slate-500 mb-2">
              <p>Status</p>
            </div>

            <select
              value={statusId}
              onChange={(e) => setStatusId(e.target.value)}
              className="w-full border rounded-lg px-4 py-3 mb-4"
            >
              {statusList.map((status) => (
                <option key={status.id} value={status.id}>
                  {status.namaStatus}
                </option>
              ))}
            </select>

            <p className="text-sm text-slate-500 mb-4">
              {statusDescription[laporan.namaStatus]}
            </p>

            <button
              onClick={handleUpdateStatus}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg"
            >
              Simpan Status
            </button>
          </div>

          {/* Kategori */}
          <div className="bg-slate-50 rounded-xl p-6 transition hover:bg-white hover:shadow-md">
            <div className="flex items-center gap-2 text-slate-500">
              <Tag size={16} />
              <p>Kategori</p>
            </div>

            <p className="font-semibold mt-2">{laporan.namaKategori}</p>
          </div>

          {/* Pelapor */}
          <div className="bg-slate-50 rounded-xl p-6 transition hover:bg-white hover:shadow-md">
            <div className="flex items-center gap-2 text-slate-500">
              <User size={16} />
              <p>Pelapor</p>
            </div>

            <p className="font-semibold mt-2">{laporan.namaUser}</p>
          </div>

          {/* Lokasi */}
          <div className="bg-slate-50 rounded-xl p-6 transition hover:bg-white hover:shadow-md">
            <div className="flex items-center gap-2 text-slate-500">
              <MapPin size={16} />
              <p>Lokasi</p>
            </div>

            <p className="font-semibold mt-2">{laporan.lokasi}</p>
          </div>

          {/* Tanggal */}
          <div className="bg-slate-50 rounded-xl p-6 md:col-span-2 transition hover:bg-white hover:shadow-md">
            <div className="flex items-center gap-2 text-slate-500">
              <Calendar size={16} />
              <p>Tanggal</p>
            </div>

            <p className="font-semibold mt-2">
              {formatTanggal(laporan.tanggalLaporan)}
            </p>
          </div>
        </div>

        <hr className="my-10 border-slate-300" />

        {/* Deskripsi */}
        <div>
          <h2 className="text-xl font-bold mb-4">Deskripsi</h2>

          <div className="bg-slate-50 rounded-xl p-6">
            <p className="text-slate-700 leading-8 text-justify">
              {laporan.deskripsi}
            </p>
          </div>
        </div>

        {/* Foto */}
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Foto Laporan</h2>

          {fotoList.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {fotoList.map((foto) => (
                <div
                  key={foto.id}
                  className="rounded-xl overflow-hidden border shadow-sm"
                >
                  <img
                    src={`http://localhost:8080/${foto.pathFoto}`}
                    alt="Foto Laporan"
                    className="w-full h-48 object-cover hover:scale-105 transition duration-300"
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="border-2 border-dashed border-slate-300 rounded-xl h-64 bg-slate-50 flex flex-col items-center justify-center">
              <Image size={72} className="text-slate-400" />
              <p className="mt-4 font-medium text-slate-500">
                Belum ada foto pendukung.
              </p>
            </div>
          )}
        </div>
        <KomentarList laporanId={id} />
      </div>
    </DashboardLayout>
  );
}
