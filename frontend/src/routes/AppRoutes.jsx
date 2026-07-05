import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";

// Landing
import Landing from "../pages/landing/Landing";

// Auth
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

// ==================== WARGA ====================
import DashboardWarga from "../pages/warga/DashboardWarga";
import LaporanWarga from "../pages/warga/LaporanWarga";
import DetailLaporanWarga from "../pages/warga/DetailLaporanWarga";
import ProfileWarga from "../pages/warga/ProfileWarga";
import EditProfileWarga from "../pages/warga/EditProfileWarga";

// ==================== RW ====================
import DashboardRW from "../pages/rw/DashboardRW";
import MyLaporanRW from "../pages/rw/MyLaporanRW";
import AllLaporanRW from "../pages/rw/AllLaporanRW";
import DetailLaporanRW from "../pages/rw/DetailLaporanRW";
import CreateLaporanRW from "../pages/rw/CreateLaporanRW";
import EditLaporanRW from "../pages/rw/EditLaporanRW";
import ProfileRW from "../pages/rw/ProfileRW";
import EditProfileRW from "../pages/rw/EditProfileRW";

// ==================== ADMIN ====================
import DashboardAdmin from "../pages/admin/DashboardAdmin";

import AllLaporanAdmin from "../pages/admin/laporan/AllLaporanAdmin";
import DetailLaporanAdmin from "../pages/admin/laporan/DetailLaporanAdmin";

import UserList from "../pages/admin/user/UserList";
import DetailUser from "../pages/admin/user/DetailUser";
import EditUser from "../pages/admin/user/EditUser";

import KategoriList from "../pages/admin/kategori/KategoriList";
import CreateKategori from "../pages/admin/kategori/CreateKategori";
import EditKategori from "../pages/admin/kategori/EditKategori";

import StatusList from "../pages/admin/status/StatusList";
import CreateStatus from "../pages/admin/status/CreateStatus";
import EditStatus from "../pages/admin/status/EditStatus";

import RoleList from "../pages/admin/role/RoleList";
import CreateRole from "../pages/admin/role/CreateRole";
import EditRole from "../pages/admin/role/EditRole";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ==================== PUBLIC ==================== */}

        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ==================== WARGA ==================== */}

        <Route
          path="/warga/dashboard"
          element={
            <ProtectedRoute allowedRoles={["WARGA"]}>
              <DashboardWarga />
            </ProtectedRoute>
          }
        />

        <Route
          path="/warga/laporan"
          element={
            <ProtectedRoute allowedRoles={["WARGA"]}>
              <LaporanWarga />
            </ProtectedRoute>
          }
        />

        <Route
          path="/warga/laporan/:id"
          element={
            <ProtectedRoute allowedRoles={["WARGA"]}>
              <DetailLaporanWarga />
            </ProtectedRoute>
          }
        />

        <Route
          path="/warga/profile"
          element={
            <ProtectedRoute allowedRoles={["WARGA"]}>
              <ProfileWarga />
            </ProtectedRoute>
          }
        />

        <Route
          path="/warga/profile/edit"
          element={
            <ProtectedRoute allowedRoles={["WARGA"]}>
              <EditProfileWarga />
            </ProtectedRoute>
          }
        />

        {/* ==================== RW ==================== */}

        <Route
          path="/rw/dashboard"
          element={
            <ProtectedRoute allowedRoles={["RW"]}>
              <DashboardRW />
            </ProtectedRoute>
          }
        />

        <Route
          path="/rw/laporan/my"
          element={
            <ProtectedRoute allowedRoles={["RW"]}>
              <MyLaporanRW />
            </ProtectedRoute>
          }
        />

        <Route
          path="/rw/laporan"
          element={
            <ProtectedRoute allowedRoles={["RW"]}>
              <AllLaporanRW />
            </ProtectedRoute>
          }
        />

        <Route
          path="/rw/laporan/:id"
          element={
            <ProtectedRoute allowedRoles={["RW"]}>
              <DetailLaporanRW />
            </ProtectedRoute>
          }
        />

        <Route
          path="/rw/laporan/create"
          element={
            <ProtectedRoute allowedRoles={["RW"]}>
              <CreateLaporanRW />
            </ProtectedRoute>
          }
        />

        <Route
          path="/rw/laporan/:id/edit"
          element={
            <ProtectedRoute allowedRoles={["RW"]}>
              <EditLaporanRW />
            </ProtectedRoute>
          }
        />

        <Route
          path="/rw/profile"
          element={
            <ProtectedRoute allowedRoles={["RW"]}>
              <ProfileRW />
            </ProtectedRoute>
          }
        />

        <Route
          path="/rw/profile/edit"
          element={
            <ProtectedRoute allowedRoles={["RW"]}>
              <EditProfileRW />
            </ProtectedRoute>
          }
        />

        {/* ==================== ADMIN ==================== */}

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRoles={["SUPER_ADMIN"]}>
              <DashboardAdmin />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/laporan"
          element={
            <ProtectedRoute allowedRoles={["SUPER_ADMIN"]}>
              <AllLaporanAdmin />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/laporan/:id"
          element={
            <ProtectedRoute allowedRoles={["SUPER_ADMIN"]}>
              <DetailLaporanAdmin />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/user"
          element={
            <ProtectedRoute allowedRoles={["SUPER_ADMIN"]}>
              <UserList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/user/:id"
          element={
            <ProtectedRoute allowedRoles={["SUPER_ADMIN"]}>
              <DetailUser />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/user/:id/edit"
          element={
            <ProtectedRoute allowedRoles={["SUPER_ADMIN"]}>
              <EditUser />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/kategori"
          element={
            <ProtectedRoute allowedRoles={["SUPER_ADMIN"]}>
              <KategoriList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/kategori/create"
          element={
            <ProtectedRoute allowedRoles={["SUPER_ADMIN"]}>
              <CreateKategori />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/kategori/:id/edit"
          element={
            <ProtectedRoute allowedRoles={["SUPER_ADMIN"]}>
              <EditKategori />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/status"
          element={
            <ProtectedRoute allowedRoles={["SUPER_ADMIN"]}>
              <StatusList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/status/create"
          element={
            <ProtectedRoute allowedRoles={["SUPER_ADMIN"]}>
              <CreateStatus />
            </ProtectedRoute>
          }
        />

        <Route path="/admin/status/:id/edit"
          element={
            <ProtectedRoute allowedRoles={["SUPER_ADMIN"]}>
              <EditStatus />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/role"
          element={
            <ProtectedRoute allowedRoles={["SUPER_ADMIN"]}>
              <RoleList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/role/create"
          element={
            <ProtectedRoute allowedRoles={["SUPER_ADMIN"]}>
              <CreateRole />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/role/:id/edit"
          element={
            <ProtectedRoute allowedRoles={["SUPER_ADMIN"]}>
              <EditRole />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
