import { Link } from "react-router-dom";
import hero from "../../assets/images/LandingHero.png";

function Hero() {
  return (
    <section className="pt-36 pb-28">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 items-center gap-12 px-8">
        <div>
          <p className="text-green-600 font-semibold mb-5">
            ● PLATFORM PENGADUAN DESA
          </p>

          <h1 className="text-6xl font-extrabold leading-tight">
            <span className="text-green-600">PENGADUAN</span>
            <br />
            WARGA DESA ONLINE
          </h1>

          <p className="mt-8 text-gray-600 text-xl leading-9">
            Laporkan dan pantau pengaduan warga desa secara mudah, cepat, aman,
            dan transparan.
          </p>

          <div className="mt-10 flex gap-5">
            <Link
              to="/login"
              className="px-10 py-4 bg-green-600 text-white rounded-xl hover:bg-green-700 transition"
            >
              Masuk
            </Link>

            <Link
              to="/register"
              className="px-10 py-4 border border-black rounded-xl hover:bg-gray-100 transition"
            >
              Daftar
            </Link>
          </div>
        </div>

        <div>
          <img src={hero} className="w-full animate-pulse" alt="Hero" />
        </div>
      </div>
    </section>
  );
}

export default Hero;
