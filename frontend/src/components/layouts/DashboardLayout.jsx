import Navbar from "./Navbar";

import SidebarWarga from "./sidebar/SidebarWarga";
import SidebarRW from "./sidebar/SidebarRW";
import SidebarAdmin from "./sidebar/SidebarAdmin";

import { getRole } from "../../utils/token";

export default function DashboardLayout({ children }) {
  const role = getRole();

  const renderSidebar = () => {
    switch (role) {
      case "WARGA":
        return <SidebarWarga />;

      case "RW":
        return <SidebarRW />;

      case "SUPER_ADMIN":
        return <SidebarAdmin />;

      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-100">
      {renderSidebar()}

      <div className="flex-1 flex flex-col">
        <Navbar />

        <main className="flex-1 p-8 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
