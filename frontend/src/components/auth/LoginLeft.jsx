import logo from "../../assets/images/logo.png";
import hero from "../../assets/images/Ilustrations.png";

import { Zap, ShieldCheck, BadgeCheck } from "lucide-react";

export default function LoginLeft() {
  return (
    <div className="hidden lg:flex relative overflow-hidden flex-col px-16 py-14 bg-gradient-to-br from-[#B7ECD2] via-[#8FDCB5] to-[#69C88E] text-white">
      {/* Background Blur */}
      <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-white/20 blur-3xl"></div>

      <div className="absolute bottom-0 right-0 w-[420px] h-[420px] rounded-full bg-white/10 blur-3xl"></div>

      <div className="absolute top-40 left-20 w-72 h-72 rounded-full bg-white/10 blur-3xl"></div>

      <div className="absolute bottom-32 left-40 w-56 h-56 rounded-full bg-[#BDEFD3]/30 blur-3xl"></div>

      <div className="absolute top-1/2 right-10 w-60 h-60 rounded-full bg-white/10 blur-3xl"></div>

      {/* Logo */}
      <div className="relative z-10 flex items-center gap-4">
        <img src={logo} alt="Logo" className="w-20 object-contain" />

        <div>
          <h1 className="text-4xl font-bold tracking-tight">Pengaduan Desa</h1>

          <p className="text-xl text-white/90">Warga Desa Online</p>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col justify-center items-center">
        <h2 className="text-6xl font-extrabold text-center leading-tight">
          Sampaikan
          <br />
          Aspirasimu.
        </h2>

        <p className="mt-6 max-w-md text-center text-lg leading-9 text-white/90">
          Platform digital yang membantu masyarakat menyampaikan pengaduan
          secara cepat, aman, transparan, serta terdokumentasi dengan baik.
        </p>

        <img
          src={hero}
          alt="Hero"
          className="w-[520px] max-w-full mt-8 drop-shadow-[0_30px_60px_rgba(0,0,0,.18)] transition duration-500 hover:scale-105"
        />

        {/* Badge */}
        <div className="mt-8 flex justify-center gap-5">
          <div className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/20 backdrop-blur-lg border border-white/20 shadow-xl">
            <Zap size={20} />
            <span className="font-medium">Cepat</span>
          </div>

          <div className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/20 backdrop-blur-lg border border-white/20 shadow-xl">
            <ShieldCheck size={20} />
            <span className="font-medium">Aman</span>
          </div>

          <div className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/20 backdrop-blur-lg border border-white/20 shadow-xl">
            <BadgeCheck size={20} />
            <span className="font-medium">Transparan</span>
          </div>
        </div>
      </div>
    </div>
  );
}
