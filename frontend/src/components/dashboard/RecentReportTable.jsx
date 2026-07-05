import { Link } from "react-router-dom";

export default function RecentReportTable({
  laporan = [],
  title = "Laporan Terbaru",
  description = "",
  detailBasePath = "/warga/laporan",
}) {
  console.log("RecentReportTable :", laporan);
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <div className="mb-5">
        <h2 className="text-xl font-bold text-slate-800">{title}</h2>

        {description && (
          <p className="text-sm text-slate-500 mt-1">{description}</p>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-3">No</th>

              <th className="text-left py-3">Judul</th>

              <th className="text-left py-3">Lokasi</th>

              <th className="text-left py-3">Tanggal</th>

              <th className="text-left py-3">Status</th>

              <th className="text-center py-3">Aksi</th>
            </tr>
          </thead>

          <tbody>
            {laporan.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-8 text-slate-400">
                  Belum ada laporan.
                </td>
              </tr>
            ) : (
              laporan.slice(0, 5).map((item, index) => (
                <tr key={item.id} className="border-b hover:bg-slate-50">
                  <td className="py-4">{index + 1}</td>

                  <td>{item.judul}</td>

                  <td>{item.lokasi}</td>

                  <td>
                    {item.tanggalLaporan
                      ? new Date(item.tanggalLaporan).toLocaleDateString(
                          "id-ID",
                        )
                      : "-"}
                  </td>

                  <td>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium
                        ${
                          item.namaStatus === "MENUNGGU"
                            ? "bg-yellow-100 text-yellow-700"
                            : item.namaStatus === "DIPROSES"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-green-100 text-green-700"
                        }`}
                    >
                      {item.namaStatus}
                    </span>
                  </td>

                  <td className="text-center">
                    <Link
                      to={`${detailBasePath}/${item.id}`}
                      className="text-green-600 hover:underline"
                    >
                      Detail
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
