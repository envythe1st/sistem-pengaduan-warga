package pengaduan_desa.config;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;
import pengaduan_desa.entity.KategoriLaporan;
import pengaduan_desa.entity.Laporan;
import pengaduan_desa.entity.Role;
import pengaduan_desa.entity.StatusLaporan;
import pengaduan_desa.entity.User;
import pengaduan_desa.repository.KategoriLaporanRepository;
import pengaduan_desa.repository.LaporanRepository;
import pengaduan_desa.repository.RoleRepository;
import pengaduan_desa.repository.StatusLaporanRepository;
import pengaduan_desa.repository.UserRepository;

@Component
@RequiredArgsConstructor
public class DatabaseSeeder implements CommandLineRunner {

    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final StatusLaporanRepository statusRepository;
    private final KategoriLaporanRepository kategoriRepository;
    private final LaporanRepository laporanRepository;

    @Override
    public void run(String... args) {

        if (roleRepository.count() == 0) {

            Role superAdmin = new Role();
            superAdmin.setNamaRole("SUPER_ADMIN");

            Role rw = new Role();
            rw.setNamaRole("RW");

            Role warga = new Role();
            warga.setNamaRole("WARGA");

            roleRepository.save(superAdmin);
            roleRepository.save(rw);
            roleRepository.save(warga);
        }

        if (userRepository.count() == 0) {

            Role adminRole = roleRepository.findAll()
                    .stream()
                    .filter(r -> r.getNamaRole().equals("SUPER_ADMIN"))
                    .findFirst()
                    .orElseThrow();

            Role rwRole = roleRepository.findAll()
                    .stream()
                    .filter(r -> r.getNamaRole().equals("RW"))
                    .findFirst()
                    .orElseThrow();

            Role wargaRole = roleRepository.findAll()
                    .stream()
                    .filter(r -> r.getNamaRole().equals("WARGA"))
                    .findFirst()
                    .orElseThrow();

            // ================= ADMIN =================
            userRepository.save(User.builder()
                    .nama("Administrator")
                    .email("admin@desa.com")
                    .password(passwordEncoder.encode("admin123"))
                    .role(adminRole)
                    .noHp("081111111111")
                    .alamat("Kantor Desa")
                    .bio("Administrator Sistem Pengaduan Desa")
                    .fotoProfil("admin.jpg")
                    .build());

            // ================= RW =================
            userRepository.save(User.builder()
                    .nama("Ahmad Fauzi")
                    .email("rw01@desa.com")
                    .password(passwordEncoder.encode("rw123"))
                    .role(rwRole)
                    .noHp("081200000001")
                    .alamat("RW 01")
                    .bio("Ketua RW 01")
                    .fotoProfil("rw01.jpg")
                    .build());

            userRepository.save(User.builder()
                    .nama("Budi Santoso")
                    .email("rw02@desa.com")
                    .password(passwordEncoder.encode("rw123"))
                    .role(rwRole)
                    .noHp("081200000002")
                    .alamat("RW 02")
                    .bio("Ketua RW 02")
                    .fotoProfil("rw02.jpg")
                    .build());

            userRepository.save(User.builder()
                    .nama("Citra Lestari")
                    .email("rw03@desa.com")
                    .password(passwordEncoder.encode("rw123"))
                    .role(rwRole)
                    .noHp("081200000003")
                    .alamat("RW 03")
                    .bio("Ketua RW 03")
                    .fotoProfil("rw03.jpg")
                    .build());

            userRepository.save(User.builder()
                    .nama("Dedi Hidayat")
                    .email("rw04@desa.com")
                    .password(passwordEncoder.encode("rw123"))
                    .role(rwRole)
                    .noHp("081200000004")
                    .alamat("RW 04")
                    .bio("Ketua RW 04")
                    .fotoProfil("rw04.jpg")
                    .build());

            userRepository.save(User.builder()
                    .nama("Eka Prasetyo")
                    .email("rw05@desa.com")
                    .password(passwordEncoder.encode("rw123"))
                    .role(rwRole)
                    .noHp("081200000005")
                    .alamat("RW 05")
                    .bio("Ketua RW 05")
                    .fotoProfil("rw05.jpg")
                    .build());

            // ================= WARGA =================
            userRepository.save(User.builder()
                    .nama("Andi Saputra")
                    .email("andi@desa.com")
                    .password(passwordEncoder.encode("warga123"))
                    .role(wargaRole)
                    .noHp("081300000001")
                    .alamat("RT 01 / RW 01")
                    .bio("Warga Desa")
                    .fotoProfil("andi.jpg")
                    .build());

            userRepository.save(User.builder()
                    .nama("Siti Aisyah")
                    .email("siti@desa.com")
                    .password(passwordEncoder.encode("warga123"))
                    .role(wargaRole)
                    .noHp("081300000002")
                    .alamat("RT 02 / RW 03")
                    .bio("Warga Desa")
                    .fotoProfil("siti.jpg")
                    .build());

            userRepository.save(User.builder()
                    .nama("Rizky Ramadhan")
                    .email("rizky@desa.com")
                    .password(passwordEncoder.encode("warga123"))
                    .role(wargaRole)
                    .noHp("081300000003")
                    .alamat("RT 01 / RW 05")
                    .bio("Warga Desa")
                    .fotoProfil("rizky.jpg")
                    .build());

        }

        if (statusRepository.count() == 0) {

            statusRepository.save(
                    StatusLaporan.builder()
                            .namaStatus("MENUNGGU")
                            .build());

            statusRepository.save(
                    StatusLaporan.builder()
                            .namaStatus("DIPROSES")
                            .build());

            statusRepository.save(
                    StatusLaporan.builder()
                            .namaStatus("SELESAI")
                            .build());

            statusRepository.save(
                    StatusLaporan.builder()
                            .namaStatus("DITOLAK")
                            .build());

        }

        if (kategoriRepository.count() == 0) {

            String[] kategoriDefault = {
                "Kerusakan Jalan",
                "Penerangan Jalan",
                "Drainase",
                "Kebersihan Lingkungan",
                "Keamanan",
                "Fasilitas Umum",
                "Air Bersih",
                "Sampah",
                "Lingkungan",
                "Bencana Alam"

            };

            for (String nama : kategoriDefault) {

                KategoriLaporan kategori = new KategoriLaporan();

                kategori.setNamaKategori(nama);

                kategoriRepository.save(kategori);
            }
        }

        if (laporanRepository.count() == 0) {

            List<User> warga = userRepository.findAll().stream()
                    .filter(u -> u.getRole().getNamaRole().equals("WARGA"))
                    .toList();

            List<KategoriLaporan> kategori = kategoriRepository.findAll();

            StatusLaporan menunggu = statusRepository.findAll().stream()
                    .filter(s -> s.getNamaStatus().equals("MENUNGGU"))
                    .findFirst()
                    .orElseThrow();

            StatusLaporan diproses = statusRepository.findAll().stream()
                    .filter(s -> s.getNamaStatus().equals("DIPROSES"))
                    .findFirst()
                    .orElseThrow();

            StatusLaporan selesai = statusRepository.findAll().stream()
                    .filter(s -> s.getNamaStatus().equals("SELESAI"))
                    .findFirst()
                    .orElseThrow();

            StatusLaporan ditolak = statusRepository.findAll().stream()
                    .filter(s -> s.getNamaStatus().equals("DITOLAK"))
                    .findFirst()
                    .orElseThrow();

            Object[][] data = {
                {
                    "Jalan Berlubang di RT 01",
                    "Jalan utama mengalami kerusakan dan membahayakan pengendara.",
                    "RT 01 / RW 01",
                    0,
                    0,
                    menunggu
                },
                {
                    "Lampu Jalan Mati",
                    "Lampu penerangan jalan tidak menyala sejak dua hari.",
                    "RT 03 / RW 03",
                    1,
                    1,
                    diproses
                },
                {
                    "Sampah Menumpuk",
                    "Sampah belum diangkut selama beberapa hari.",
                    "Pasar Desa",
                    2,
                    7,
                    selesai
                },
                {
                    "Drainase Tersumbat",
                    "Saluran air tersumbat sehingga menyebabkan genangan.",
                    "RT 02 / RW 01",
                    0,
                    2,
                    diproses
                },
                {
                    "Pos Kamling Rusak",
                    "Atap pos ronda bocor dan perlu diperbaiki.",
                    "RW 05",
                    2,
                    5,
                    menunggu
                },
                {
                    "Air Bersih Tidak Mengalir",
                    "Distribusi air berhenti sejak pagi.",
                    "RW 03",
                    1,
                    6,
                    ditolak
                },
                {
                    "Pohon Tumbang",
                    "Pohon tumbang menutup akses jalan.",
                    "RW 04",
                    0,
                    9,
                    selesai
                },
                {
                    "Trotoar Rusak",
                    "Trotoar retak dan membahayakan pejalan kaki.",
                    "RW 02",
                    2,
                    0,
                    diproses
                },
                {
                    "Taman Desa Kotor",
                    "Rumput tinggi dan banyak sampah.",
                    "RW 01",
                    1,
                    3,
                    menunggu
                },
                {
                    "Pagar Lapangan Rusak",
                    "Pagar lapangan roboh akibat angin.",
                    "RW 05",
                    0,
                    5,
                    selesai
                }

            };

            for (int i = 0; i < data.length; i++) {

                Laporan laporan = Laporan.builder()
                        .judul((String) data[i][0])
                        .deskripsi((String) data[i][1])
                        .lokasi((String) data[i][2])
                        .user(warga.get((Integer) data[i][3]))
                        .kategori(kategori.get((Integer) data[i][4]))
                        .status((StatusLaporan) data[i][5])
                        .tanggalLaporan(LocalDateTime.now().minusDays(10 - i))
                        .createdAt(LocalDateTime.now().minusDays(10 - i))
                        .updatedAt(LocalDateTime.now().minusDays(10 - i))
                        .build();

                laporanRepository.save(laporan);

            }

        }

    }
}
