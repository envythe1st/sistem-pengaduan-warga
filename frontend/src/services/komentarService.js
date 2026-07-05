import api from "../api/axios";

// =======================
// GET ALL KOMENTAR
// =======================
export const getAllKomentar = () => {
    return api.get("/komentar");
};

// =======================
// GET KOMENTAR BY ID
// =======================
export const getKomentarById = (id) => {
    return api.get(`/komentar/${id}`);
};

// =======================
// GET KOMENTAR BERDASARKAN LAPORAN
// =======================
export const getKomentarByLaporan = (laporanId) => {
    return api.get(`/komentar/laporan/${laporanId}`);
};

// =======================
// CREATE KOMENTAR
// =======================
export const createKomentar = (data) => {
    return api.post("/komentar", data);
};

// =======================
// UPDATE KOMENTAR
// =======================
export const updateKomentar = (id, data) => {
    return api.put(`/komentar/${id}`, data);
};

// =======================
// DELETE KOMENTAR
// =======================
export const deleteKomentar = (id) => {
    return api.delete(`/komentar/${id}`);
};