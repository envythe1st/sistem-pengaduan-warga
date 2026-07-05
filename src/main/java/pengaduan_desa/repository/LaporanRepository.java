package pengaduan_desa.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import pengaduan_desa.entity.Laporan;
import pengaduan_desa.entity.User;

public interface LaporanRepository extends JpaRepository<Laporan, Long> {

    List<Laporan> findAllByOrderByTanggalLaporanDesc();

    List<Laporan> findByUserOrderByTanggalLaporanDesc(User user);

}
