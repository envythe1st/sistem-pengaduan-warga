import api from "../api/axios";

export const getAllKategori = () => {
    return api.get("/kategori");
};

export const getKategoriById = (id) => {
    return api.get(`/kategori/${id}`);
};

export const createKategori = (data) => {
    return api.post("/kategori", data);
};

export const updateKategori = (id, data) => {
    return api.put(`/kategori/${id}`, data);
};

export const deleteKategori = (id) => {
    return api.delete(`/kategori/${id}`);
};