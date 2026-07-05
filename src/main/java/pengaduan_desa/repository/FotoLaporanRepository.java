package pengaduan_desa.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import pengaduan_desa.entity.FotoLaporan;

public interface FotoLaporanRepository extends JpaRepository<FotoLaporan, Long> {

    List<FotoLaporan> findByLaporanId(Long laporanId);

}
