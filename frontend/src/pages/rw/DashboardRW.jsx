import { useEffect, useState } from "react";

import { FileText, Clock3, CheckCircle, Hourglass } from "lucide-react";

import DashboardLayout from "../../components/layouts/DashboardLayout";

import Greeting from "../../components/dashboard/Greeting";
import StatCard from "../../components/dashboard/StatCard";
import RecentReportTable from "../../components/dashboard/RecentReportTable";

import { getAllLaporan, getMyLaporan } from "../../services/laporanService";

export default function DashboardRW() {
  const [allLaporan, setAllLaporan] = useState([]);
  const [myLaporan, setMyLaporan] = useState([]);
  
  const fetchDashboard = async () => {
    try {
      const [allResponse, myResponse] = await Promise.all([
        getAllLaporan(),
        getMyLaporan(),
      ]);

      setAllLaporan(allResponse?.data?.data || []);
      setMyLaporan(myResponse?.data?.data || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  const total = myLaporan.length;

  const menunggu = myLaporan.filter(
    (item) => item.namaStatus === "MENUNGGU",
  ).length;

  const diproses = myLaporan.filter(
    (item) => item.namaStatus === "DIPROSES",
  ).length;

  const selesai = myLaporan.filter(
    (item) => item.namaStatus === "SELESAI",
  ).length;

  return (
    <DashboardLayout>
      <Greeting />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-8">
        <StatCard
          title="Total Laporan Saya"
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
          laporan={allLaporan}
          detailBasePath="/rw/laporan"
        />
      </div>

      <div className="mt-10">
        <RecentReportTable
          title="Laporan Saya"
          description="5 laporan terakhir yang Anda kirim."
          laporan={myLaporan}
          detailBasePath="/rw/laporan"
        />
      </div>
    </DashboardLayout>
  );
}
