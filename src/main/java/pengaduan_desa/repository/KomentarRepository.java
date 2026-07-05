package pengaduan_desa.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import pengaduan_desa.entity.Komentar;

public interface KomentarRepository extends JpaRepository<Komentar, Long> {

    List<Komentar> findByLaporanIdOrderByCreatedAtAsc(Long laporanId);

}
