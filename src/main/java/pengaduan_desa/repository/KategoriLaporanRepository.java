package pengaduan_desa.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import pengaduan_desa.entity.KategoriLaporan;

public interface KategoriLaporanRepository extends JpaRepository<KategoriLaporan, Long> {

    boolean existsByNamaKategori(String namaKategori);
}
