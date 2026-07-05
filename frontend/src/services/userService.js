import api from "../api/axios";

/* ===========================
   GET PROFILE
=========================== */

export const getMe = () => {
  return api.get("/users/me");
};

/* ===========================
   UPDATE PROFILE
=========================== */

export const updateProfile = (data) => {
  return api.put("/users/me", data);
};

/* ===========================
   CHANGE PASSWORD
=========================== */

export const changePassword = (data) => {
  return api.put("/users/change-password", data);
};

/* ===========================
   UPLOAD FOTO PROFILE
=========================== */

export const uploadPhoto = (file) => {
  const formData = new FormData();

  formData.append("foto", file);

  return api.post("/users/upload-photo", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getAllUsers = () => {
  return api.get("/users");
};

export const getUserById = (id) => {
  return api.get(`/users/${id}`);
};

export const updateUser = (id, data) => {
  return api.put(`/users/${id}`, data);
};

export const deleteUser = (id) => {
  return api.delete(`/users/${id}`);
};