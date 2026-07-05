import api from "../api/axios";

export const getAllRole = () => {
    return api.get("/roles");
};

export const getRoleById = (id) => {
    return api.get(`/roles/${id}`);
};

export const createRole = (data) => {
    return api.post("/roles", data);
};

export const updateRole = (id, data) => {
    return api.put(`/roles/${id}`, data);
};

export const deleteRole = (id) => {
    return api.delete(`/roles/${id}`);
};