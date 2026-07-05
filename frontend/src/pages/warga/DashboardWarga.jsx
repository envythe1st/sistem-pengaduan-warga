import { useEffect, useState } from "react";

import { FileText, Clock3, CheckCircle } from "lucide-react";

import DashboardLayout from "../../components/layouts/DashboardLayout";

import Greeting from "../../components/dashboard/Greeting";
import StatCard from "../../components/dashboard/StatCard";
import RecentReportTable from "../../components/dashboard/RecentReportTable";

import { getAllLaporan } from "../../services/laporanService";

export default function DashboardWarga() {
  const [laporan, setLaporan] = useState([]);

  useEffect(() => {
    const fetchLaporan = async () => {
      try {
        const response = await getAllLaporan();
        setLaporan(response.data.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchLaporan();
  }, []);

  const totalLaporan = laporan.length;

  const diproses = laporan.filter(
    (item) => item.namaStatus === "DIPROSES",
  ).length;

  const selesai = laporan.filter(
    (item) => item.namaStatus === "SELESAI",
  ).length;

  return (
    <DashboardLayout>
      <Greeting />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <StatCard
          title="Total Laporan"
          value={totalLaporan}
          icon={<FileText className="text-white" />}
          color="bg-green-500"
        />

        <StatCard
          title="Sedang Diproses"
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

      <RecentReportTable laporan={laporan} />
    </DashboardLayout>
  );
}
