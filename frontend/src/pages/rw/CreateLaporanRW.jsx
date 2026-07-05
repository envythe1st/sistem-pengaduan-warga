import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { ArrowLeft, Upload, Image, Send, X } from "lucide-react";

import toast from "react-hot-toast";

import DashboardLayout from "../../components/layouts/DashboardLayout";

import { createLaporan, uploadFoto } from "../../services/laporanService";
import { getAllKategori } from "../../services/kategoriService";

export default function CreateLaporanRW() {
  const navigate = useNavigate();

  const [kategoriList, setKategoriList] = useState([]);

  const [form, setForm] = useState({
    judul: "",
    kategori: "",
    lokasi: "",
    deskripsi: "",
  });

  const [foto, setFoto] = useState(null);

  useEffect(() => {
    fetchKategori();
  }, []);

  const fetchKategori = async () => {
    try {
      const response = await getAllKategori();
      setKategoriList(response.data.data || []);
    } catch (error) {
      console.error(error);

      console.log("Response:", error.response);
      console.log("Data:", error.response?.data);
      console.log("Status:", error.response?.status);

      toast.error("Gagal mengirim laporan.");
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleFoto = (e) => {
    if (e.target.files.length > 0) {
      setFoto(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await createLaporan({
        judul: form.judul,
        deskripsi: form.deskripsi,
        lokasi: form.lokasi,
        kategoriId: Number(form.kategori),
      });

      console.log(response);

      const laporan = response.data.data;

      // Upload foto jika dipilih
      if (foto) {
        await uploadFoto(laporan.id, foto);
      }

      toast.success("Laporan berhasil dikirim!");

      navigate(`/rw/laporan/${laporan.id}`);
    } catch (error) {
      console.error(error);

      toast.error("Gagal mengirim laporan.");
    }
  };

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

        <h1 className="text-4xl font-bold text-slate-800">Buat Laporan Baru</h1>

        <p className="text-slate-500 mt-2">
          Laporkan permasalahan yang terjadi di wilayah Anda.
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
              placeholder="Contoh: Lampu Jalan Mati"
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
              placeholder="Masukkan lokasi"
              className="w-full mt-2 border rounded-xl px-4 py-3"
              required
            />
          </div>

          {/* Deskripsi */}

          <div>
            <label className="font-medium text-slate-700">Deskripsi</label>

            <textarea
              rows="6"
              name="deskripsi"
              value={form.deskripsi}
              onChange={handleChange}
              placeholder="Jelaskan kondisi secara lengkap..."
              className="w-full mt-2 border rounded-xl px-4 py-3 resize-none"
              required
            />
          </div>

          {/* Upload Foto */}

          <div>
            <label className="font-medium text-slate-700">Foto Bukti</label>

            <label className="mt-3 flex flex-col items-center justify-center border-2 border-dashed border-slate-300 rounded-2xl p-8 cursor-pointer hover:border-green-500 transition">
              <Image size={42} className="text-slate-400 mb-3" />

              <p className="font-medium">Klik untuk memilih gambar</p>

              <p className="text-sm text-slate-500 mt-1">PNG, JPG, JPEG</p>

              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFoto}
              />
            </label>

            {foto && (
              <div className="mt-4 flex items-center justify-between bg-green-50 rounded-xl p-3">
                <div className="flex items-center gap-3">
                  <Upload size={20} className="text-green-600" />

                  <span className="text-sm">{foto.name}</span>
                </div>

                <button
                  type="button"
                  onClick={() => setFoto(null)}
                  className="text-red-500"
                >
                  <X size={18} />
                </button>
              </div>
            )}
          </div>

          {/* Tombol */}

          <div className="flex justify-end gap-4 pt-4">
            <Link
              to="/rw/laporan/my"
              className="px-6 py-3 rounded-xl border hover:bg-slate-100 transition"
            >
              Batal
            </Link>

            <button
              type="submit"
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl transition"
            >
              <Send size={18} />
              Kirim Laporan
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
