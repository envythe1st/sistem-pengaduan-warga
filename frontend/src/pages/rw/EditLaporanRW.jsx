import { useEffect, useRef, useState } from "react";
import { data, Link, useNavigate, useParams } from "react-router-dom";

import { ArrowLeft, Save, Image, Upload, Trash2 } from "lucide-react";

import toast from "react-hot-toast";

import DashboardLayout from "../../components/layouts/DashboardLayout";

import {
  getLaporanById,
  updateLaporan,
  uploadFoto,
  getFotoByLaporan,
  deleteFoto,
} from "../../services/laporanService";

import { getAllKategori } from "../../services/kategoriService";

export default function EditLaporanRW() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [loading, setLoading] = useState(true);

  const [kategoriList, setKategoriList] = useState([]);
  const [fotoList, setFotoList] = useState([]);

  const fileInputRef = useRef(null);

  const [form, setForm] = useState({
    judul: "",
    kategori: "",
    lokasi: "",
    deskripsi: "",
  });

  const fetchFoto = async () => {
    try {
      const response = await getFotoByLaporan(id);

      setFotoList(response.data.data || []);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchData = async () => {
    try {
      const [laporanRes, kategoriRes] = await Promise.all([
        getLaporanById(id),
        getAllKategori(),
      ]);

      console.log(laporanRes);

      const laporan = laporanRes.data.data;

      // Cegah edit jika status bukan MENUNGGU
      if (laporan.namaStatus !== "MENUNGGU") {
        toast.error("Laporan tidak dapat diubah.");
        navigate(`/rw/laporan/${id}`);
        return;
      }

      setKategoriList(kategoriRes.data.data || []);

      const kategori = (kategoriRes.data || []).find(
        (item) => item.namaKategori === laporan.namaKategori,
      );

      setForm({
        judul: laporan.judul,
        kategori: kategori ? kategori.id : "",
        lokasi: laporan.lokasi,
        deskripsi: laporan.deskripsi,
      });

      await fetchFoto();
    } catch (error) {
      console.error(error);
      toast.error("Gagal memuat data laporan.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    try {
      await uploadFoto(id, file);

      toast.success("Foto berhasil ditambahkan.");

      fetchFoto();
    } catch (error) {
      console.error(error);

      toast.error("Upload foto gagal.");
    }
  };

  const handleDeleteFoto = async (idFoto) => {
    if (!window.confirm("Hapus foto ini?")) return;

    try {
      await deleteFoto(idFoto);

      toast.success("Foto berhasil dihapus.");

      fetchFoto();
    } catch (error) {
      console.error(error);

      toast.error("Gagal menghapus foto.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateLaporan(id, data);

      toast.success("Laporan berhasil diperbarui.");

      navigate(`/rw/laporan/${id}`);
    } catch (error) {
      console.error(error);
      toast.error("Gagal memperbarui laporan.");
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center py-20">
          <p className="text-slate-500">Memuat data...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="mb-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-green-600 hover:text-green-700 mb-6"
        >
          <ArrowLeft size={18} />
          Kembali
        </button>

        <h1 className="text-4xl font-bold text-slate-800">Edit Laporan</h1>

        <p className="text-slate-500 mt-2">
          Ubah informasi laporan selama status masih MENUNGGU.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Judul */}

          <div>
            <label className="font-medium text-slate-700">Judul Laporan</label>

            <input
              type="text"
              name="judul"
              value={form.judul}
              onChange={handleChange}
              className="w-full mt-2 border rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-300 outline-none"
              required
            />
          </div>

          {/* Kategori */}

          <div>
            <label className="font-medium text-slate-700">Kategori</label>

            <select
              name="kategori"
              value={form.kategori}
              onChange={handleChange}
              className="w-full mt-2 border rounded-xl px-4 py-3"
              required
            >
              <option value="">Pilih Kategori</option>

              {kategoriList.map((kategori) => (
                <option key={kategori.id} value={kategori.id}>
                  {kategori.namaKategori}
                </option>
              ))}
            </select>
          </div>

          {/* Lokasi */}

          <div>
            <label className="font-medium text-slate-700">Lokasi</label>

            <input
              type="text"
              name="lokasi"
              value={form.lokasi}
              onChange={handleChange}
              className="w-full mt-2 border rounded-xl px-4 py-3"
              required
            />
          </div>

          {/* Deskripsi */}

          <div>
            <label className="font-medium text-slate-700">Deskripsi</label>

            <textarea
              rows={6}
              name="deskripsi"
              value={form.deskripsi}
              onChange={handleChange}
              className="w-full mt-2 border rounded-xl px-4 py-3 resize-none"
              required
            />
          </div>
          {/* Foto Bukti */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <label className="font-medium text-slate-700">Foto Bukti</label>

              <>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleUpload}
                />

                <button
                  type="button"
                  onClick={() => fileInputRef.current.click()}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                >
                  + Tambah Foto
                </button>
              </>
            </div>

            {fotoList.length === 0 ? (
              <div className="border rounded-xl p-6 text-center text-slate-500">
                Belum ada foto.
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {fotoList.map((foto) => (
                  <div key={foto.id} className="relative group">
                    <img
                      src={`http://localhost:8080/${foto.pathFoto}`}
                      alt="Foto"
                      className="w-full h-40 object-cover rounded-xl border"
                    />

                    <button
                      type="button"
                      onClick={() => handleDeleteFoto(foto.id)}
                      className="absolute top-2 right-2 bg-red-600 text-white rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="flex justify-end gap-4 pt-4">
            <Link
              to={`/rw/laporan/${id}`}
              className="px-6 py-3 rounded-xl border hover:bg-slate-100 transition"
            >
              Batal
            </Link>

            <button
              type="submit"
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl transition"
            >
              <Save size={18} />
              Simpan Perubahan
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
