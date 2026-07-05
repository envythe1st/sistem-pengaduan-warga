import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { Pencil, Trash2, X, Check } from "lucide-react";

import {
  getKomentarByLaporan,
  createKomentar,
  updateKomentar,
  deleteKomentar,
} from "../../services/komentarService";

export default function KomentarList({ laporanId }) {
  const [komentar, setKomentar] = useState([]);
  const [isiKomentar, setIsiKomentar] = useState("");
  const [loading, setLoading] = useState(false);

  const [editId, setEditId] = useState(null);
  const [editKomentar, setEditKomentar] = useState("");

  const currentUser = {
    id: Number(localStorage.getItem("id")),
    role: localStorage.getItem("role"),
  };

  const fetchKomentar = async () => {
    try {
      const response = await getKomentarByLaporan(laporanId);

      setKomentar(response.data.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (laporanId) {
      fetchKomentar();
    }
  }, [laporanId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isiKomentar.trim()) {
      toast.error("Komentar tidak boleh kosong.");
      return;
    }

    try {
      setLoading(true);

      await createKomentar({
        laporanId,
        isiKomentar,
      });

      toast.success("Komentar berhasil dikirim.");

      setIsiKomentar("");

      fetchKomentar();
    } catch (err) {
      console.error(err);

      toast.error("Gagal mengirim komentar.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (id) => {
    if (!editKomentar.trim()) {
      toast.error("Komentar tidak boleh kosong.");
      return;
    }

    try {
      await updateKomentar(id, {
        laporanId,
        isiKomentar: editKomentar,
      });

      toast.success("Komentar berhasil diperbarui.");

      setEditId(null);
      setEditKomentar("");

      fetchKomentar();
    } catch (err) {
      console.error(err);
      toast.error("Gagal mengubah komentar.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Yakin ingin menghapus komentar?")) return;

    try {
      await deleteKomentar(id);

      toast.success("Komentar berhasil dihapus.");

      fetchKomentar();
    } catch (err) {
      console.error(err);
      toast.error("Gagal menghapus komentar.");
    }
  };

  const formatTanggal = (tanggal) => {
    if (!tanggal) return "-";

    return new Date(tanggal).toLocaleString("id-ID", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold mb-6">Komentar</h2>

      {/* List Komentar */}

      <div className="space-y-4">
        {komentar.length === 0 ? (
          <div className="bg-slate-50 rounded-xl p-6 text-center text-slate-500">
            Belum ada komentar.
          </div>
        ) : (
          komentar.map((item) => {
            const isOwner = currentUser.id === item.userId;
            const isSuperAdmin = currentUser.role === "SUPER_ADMIN";

            console.log({
              currentUserId: currentUser.id,
              itemUserId: item.userId,
              role: currentUser.role,
              isOwner: currentUser.id === item.userId,
            });

            return (
              <div key={item.id} className="bg-slate-50 rounded-xl p-5 border">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{item.namaUser}</h3>

                    <p className="text-xs text-slate-500 mt-1">
                      {formatTanggal(item.createdAt)}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    {isOwner && editId !== item.id && (
                      <button
                        onClick={() => {
                          setEditId(item.id);
                          setEditKomentar(item.isiKomentar);
                        }}
                        className="text-blue-600 hover:text-blue-700"
                      >
                        <Pencil size={18} />
                      </button>
                    )}

                    {(isOwner || isSuperAdmin) && (
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 size={18} />
                      </button>
                    )}
                  </div>
                </div>

                {editId === item.id ? (
                  <div className="mt-4">
                    <textarea
                      rows={3}
                      value={editKomentar}
                      onChange={(e) => setEditKomentar(e.target.value)}
                      className="w-full border rounded-xl px-4 py-3"
                    />

                    <div className="flex justify-end gap-2 mt-3">
                      <button
                        onClick={() => {
                          setEditId(null);
                          setEditKomentar("");
                        }}
                        className="border px-4 py-2 rounded-lg"
                      >
                        <X size={18} />
                      </button>

                      <button
                        onClick={() => handleEdit(item.id)}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                      >
                        <Check size={18} />
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="mt-4 whitespace-pre-wrap text-slate-700">
                    {item.isiKomentar}
                  </p>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Form */}

      <form onSubmit={handleSubmit} className="mt-8">
        <textarea
          rows={4}
          value={isiKomentar}
          onChange={(e) => setIsiKomentar(e.target.value)}
          className="w-full border rounded-xl px-4 py-3 resize-none"
          placeholder="Tulis komentar..."
        />

        <div className="flex justify-end mt-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white px-6 py-3 rounded-xl transition"
          >
            {loading ? "Mengirim..." : "Kirim Komentar"}
          </button>
        </div>
      </form>
    </div>
  );
}
