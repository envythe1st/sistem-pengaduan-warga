import api from "../api/axios";

export const getAllStatus = () => {
    return api.get("/status");
};

export const getStatusById = (id) => {
    return api.get(`/status/${id}`);
};

export const createStatus = (data) => {
    return api.post("/status", data);
};

export const updateStatusData = (id, data) => {
    return api.put(`/status/${id}`, data);
};

export const deleteStatus = (id) => {
    return api.delete(`/status/${id}`);
};