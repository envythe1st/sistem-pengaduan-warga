import { Send, Search, ShieldCheck, BarChart3 } from "lucide-react";

const features = [
  {
    icon: <Send size={34} />,
    title: "Laporkan Keluhan",
    desc: "Sampaikan pengaduan kapan saja dengan mudah melalui platform online.",
  },
  {
    icon: <Search size={34} />,
    title: "Pantau Progress",
    desc: "Lihat perkembangan laporan secara real-time hingga selesai.",
  },
  {
    icon: <ShieldCheck size={34} />,
    title: "Aman & Terpercaya",
    desc: "Seluruh data warga dan laporan dijaga kerahasiaannya.",
  },
  {
    icon: <BarChart3 size={34} />,
    title: "Terstruktur",
    desc: "Semua pengaduan tersimpan rapi sehingga mudah ditindaklanjuti.",
  },
];

export default function Features() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-green-600 font-semibold uppercase tracking-widest">
            Mengapa Memilih Kami
          </p>

          <h2 className="text-4xl font-bold mt-3">
            Platform Pengaduan yang Modern
          </h2>

          <p className="text-gray-500 mt-4 max-w-3xl mx-auto">
            Membantu masyarakat dan perangkat desa dalam menyampaikan, memantau,
            serta menindaklanjuti pengaduan secara transparan, cepat, dan aman.
          </p>
        </div>

        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          {features.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl p-8 shadow-md hover:shadow-xl transition duration-300"
            >
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-green-600 mb-6">
                {item.icon}
              </div>

              <h3 className="text-2xl font-semibold mb-4">{item.title}</h3>

              <p className="text-gray-500 leading-8">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
