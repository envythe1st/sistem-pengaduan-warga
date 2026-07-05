import { useEffect, useState } from "react";

import { FileText, Hourglass, Clock3, CheckCircle } from "lucide-react";

import DashboardLayout from "../../components/layouts/DashboardLayout";

import Greeting from "../../components/dashboard/Greeting";
import StatCard from "../../components/dashboard/StatCard";
import RecentReportTable from "../../components/dashboard/RecentReportTable";

import { getAllLaporan } from "../../services/laporanService";

export default function DashboardAdmin() {
  const [laporan, setLaporan] = useState([]);

  const fetchDashboard = async () => {
    try {
      const response = await getAllLaporan();

      setLaporan(response.data.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  const total = laporan.length;

  const menunggu = laporan.filter(
    (item) => item.namaStatus === "MENUNGGU",
  ).length;

  const diproses = laporan.filter(
    (item) => item.namaStatus === "DIPROSES",
  ).length;

  const selesai = laporan.filter(
    (item) => item.namaStatus === "SELESAI",
  ).length;

  return (
    <DashboardLayout>
      <Greeting />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-8">
        <StatCard
          title="Total Laporan"
          value={total}
          icon={<FileText className="text-white" />}
          color="bg-green-500"
        />

        <StatCard
          title="Menunggu"
          value={menunggu}
          icon={<Hourglass className="text-white" />}
          color="bg-yellow-500"
        />

        <StatCard
          title="Diproses"
          value={diproses}
          icon={<Clock3 className="text-white" />}
          color="bg-blue-500"
        />

        <StatCard
          title="Selesai"
          value={selesai}
          icon={<CheckCircle className="text-white" />}
          color="bg-emerald-500"
        />
      </div>

      <div className="mt-10">
        <RecentReportTable
          title="Laporan Terbaru Desa"
          description="5 laporan terbaru dari seluruh desa."
          laporan={laporan}
          detailBasePath="/admin/laporan"
        />
      </div>
    </DashboardLayout>
  );
}
