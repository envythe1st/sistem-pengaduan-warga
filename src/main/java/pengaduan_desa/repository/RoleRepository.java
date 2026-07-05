package pengaduan_desa.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import pengaduan_desa.entity.Role;

public interface RoleRepository extends JpaRepository<Role, Long> {

    Optional<Role> findByNamaRole(String namaRole);

    boolean existsByNamaRole(String namaRole);
}
