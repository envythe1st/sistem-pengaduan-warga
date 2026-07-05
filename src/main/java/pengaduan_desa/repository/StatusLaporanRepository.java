package pengaduan_desa.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import pengaduan_desa.entity.StatusLaporan;

public interface StatusLaporanRepository extends JpaRepository<StatusLaporan, Long> {

    Optional<StatusLaporan> findByNamaStatus(String namaStatus);

    boolean existsByNamaStatus(String namaStatus);

}
