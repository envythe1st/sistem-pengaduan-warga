import api from "../api/axios";

export const getAllLaporan = () => {
  return api.get("/laporan");
};

export const getMyLaporan = () => {
  return api.get("/laporan/my");
};

export const createLaporan = (data) => {
  return api.post("/laporan", data);
};

export const getLaporanById = (id) => {
  return api.get(`/laporan/${id}`);
};

export const updateLaporan = (id, data) => {
  return api.put(`/laporan/${id}`, data);
};

export const deleteLaporan = (id) => {
  return api.delete(`/laporan/${id}`);
};

export const uploadFoto = (laporanId, file) => {
  const formData = new FormData();

  formData.append("file", file);

  return api.post(`/foto/upload/${laporanId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getFotoByLaporan = (laporanId) => {
  return api.get(`/foto/laporan/${laporanId}`);
};

export const deleteFoto = (id) => {
  return api.delete(`/foto/${id}`);
};

export const updateStatus = async (id, statusId) => {
  const response = await api.put(`/laporan/${id}/status`, {
    statusId,
  });

  return response.data;
};