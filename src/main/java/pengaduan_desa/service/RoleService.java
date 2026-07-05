package pengaduan_desa.service;

import java.util.List;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import pengaduan_desa.dto.RoleRequest;
import pengaduan_desa.dto.RoleResponse;
import pengaduan_desa.entity.Role;
import pengaduan_desa.exception.BusinessException;
import pengaduan_desa.exception.NotFoundException;
import pengaduan_desa.repository.RoleRepository;

@Service
@RequiredArgsConstructor
public class RoleService {

    private final RoleRepository roleRepository;

    public RoleResponse create(RoleRequest request) {
        if (roleRepository.existsByNamaRole(request.getNamaRole())) {
            throw new BusinessException(
                    "Role sudah ada");
        }

        Role role = Role.builder()
                .namaRole(request.getNamaRole())
                .build();

        Role savedRole = roleRepository.save(role);

        return RoleResponse.builder()
                .id(savedRole.getId())
                .namaRole(savedRole.getNamaRole())
                .build();
    }

    public List<RoleResponse> getAll() {

        return roleRepository.findAll()
                .stream()
                .map(role -> RoleResponse.builder()
                .id(role.getId())
                .namaRole(role.getNamaRole())
                .build())
                .toList();
    }

    public RoleResponse getById(Long id) {

        Role role = roleRepository.findById(id)
                .orElseThrow(()
                        -> new NotFoundException("Role tidak ditemukan"));

        return RoleResponse.builder()
                .id(role.getId())
                .namaRole(role.getNamaRole())
                .build();
    }

    public RoleResponse update(Long id, RoleRequest request) {

        Role role = roleRepository.findById(id)
                .orElseThrow(()
                        -> new NotFoundException("Role tidak ditemukan"));

        role.setNamaRole(request.getNamaRole());

        Role updatedRole = roleRepository.save(role);

        return RoleResponse.builder()
                .id(updatedRole.getId())
                .namaRole(updatedRole.getNamaRole())
                .build();
    }

    public void delete(Long id) {

        Role role = roleRepository.findById(id)
                .orElseThrow(()
                        -> new NotFoundException("Role tidak ditemukan"));

        roleRepository.delete(role);
    }
}
