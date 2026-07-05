package pengaduan_desa.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import lombok.RequiredArgsConstructor;
import pengaduan_desa.dto.ChangePasswordRequest;
import pengaduan_desa.dto.UpdateProfileRequest;
import pengaduan_desa.dto.UserRequest;
import pengaduan_desa.dto.UserResponse;
import pengaduan_desa.entity.Role;
import pengaduan_desa.entity.User;
import pengaduan_desa.exception.BusinessException;
import pengaduan_desa.exception.NotFoundException;
import pengaduan_desa.repository.RoleRepository;
import pengaduan_desa.repository.UserRepository;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    @Value("${upload.profile.path}")
    private String uploadPath;

    private final PasswordEncoder passwordEncoder;

    public UserResponse create(UserRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new BusinessException("Email sudah digunakan");
        }

        Role role = roleRepository.findById(request.getRoleId())
                .orElseThrow(() -> new NotFoundException("Role tidak ditemukan"));

        User user = User.builder()
                .nama(request.getNama())
                .email(request.getEmail())
                .password(request.getPassword())
                .role(role)
                .noHp(request.getNoHp())
                .alamat(request.getAlamat())
                .fotoProfil(request.getFotoProfil())
                .bio(request.getBio())
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        User savedUser = userRepository.save(user);

        return mapToResponse(savedUser);
    }

    public List<UserResponse> getAll() {

        return userRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    public List<UserResponse> getAllSorted(String sortBy) {

        return userRepository.findAll(Sort.by(sortBy))
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    public List<UserResponse> search(String keyword) {

        return userRepository.findByNamaContainingIgnoreCase(keyword)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    public Page<UserResponse> getAll(int page, int size) {

        return userRepository.findAll(PageRequest.of(page, size))
                .map(user -> UserResponse.builder()
                .id(user.getId())
                .nama(user.getNama())
                .email(user.getEmail())
                .namaRole(user.getRole().getNamaRole())
                .noHp(user.getNoHp())
                .alamat(user.getAlamat())
                .fotoProfil(user.getFotoProfil())
                .bio(user.getBio())
                .build());
    }

    public UserResponse getById(Long id) {

        User user = userRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("User tidak ditemukan"));

        return mapToResponse(user);
    }

    public UserResponse update(Long id, UserRequest request) {

        User user = userRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("User tidak ditemukan"));

        Role role = roleRepository.findById(request.getRoleId())
                .orElseThrow(() -> new NotFoundException("Role tidak ditemukan"));

        user.setNama(request.getNama());
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword());
        user.setRole(role);
        user.setNoHp(request.getNoHp());
        user.setAlamat(request.getAlamat());
        user.setFotoProfil(request.getFotoProfil());
        user.setBio(request.getBio());
        user.setUpdatedAt(LocalDateTime.now());

        User updatedUser = userRepository.save(user);

        return mapToResponse(updatedUser);
    }

    public void delete(Long id) {

        User user = userRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("User tidak ditemukan"));

        userRepository.delete(user);
    }

    private UserResponse mapToResponse(User user) {

        return UserResponse.builder()
                .id(user.getId())
                .nama(user.getNama())
                .email(user.getEmail())
                .namaRole(user.getRole().getNamaRole())
                .noHp(user.getNoHp())
                .alamat(user.getAlamat())
                .fotoProfil(user.getFotoProfil())
                .bio(user.getBio())
                .updatedAt(user.getUpdatedAt()) // <-- wajib ada
                .build();
    }

    public UserResponse getCurrentUser() {

        Authentication authentication
                = SecurityContextHolder.getContext().getAuthentication();

        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new NotFoundException("User tidak ditemukan"));

        return mapToResponse(user);
    }

    public UserResponse updateCurrentUser(UpdateProfileRequest request) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new NotFoundException("User tidak ditemukan"));

        user.setNama(request.getNama());
        user.setEmail(request.getEmail());
        user.setNoHp(request.getNoHp());
        user.setAlamat(request.getAlamat());
        user.setBio(request.getBio());
        user.setFotoProfil(request.getFotoProfil());

        user.setUpdatedAt(LocalDateTime.now());

        User updated = userRepository.save(user);

        return mapToResponse(updated);
    }

    public UserResponse uploadPhoto(MultipartFile foto) {

        Authentication authentication
                = SecurityContextHolder.getContext().getAuthentication();

        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new NotFoundException("User tidak ditemukan"));

        if (foto == null || foto.isEmpty()) {
            throw new BusinessException("File foto tidak boleh kosong");
        }

        try {

            Path uploadDir = Paths.get(uploadPath);

            if (!Files.exists(uploadDir)) {
                Files.createDirectories(uploadDir);
            }

            String originalFilename = foto.getOriginalFilename();

            String extension = "";

            if (originalFilename != null && originalFilename.contains(".")) {
                extension = originalFilename.substring(originalFilename.lastIndexOf("."));
            }

            String fileName = UUID.randomUUID() + extension;

            Path destination = uploadDir.resolve(fileName);

            Files.copy(
                    foto.getInputStream(),
                    destination,
                    StandardCopyOption.REPLACE_EXISTING
            );

            user.setFotoProfil(fileName);
            user.setUpdatedAt(LocalDateTime.now());

            User updated = userRepository.save(user);

            return mapToResponse(updated);

        } catch (IOException e) {
            throw new RuntimeException("Gagal mengupload foto", e);
        }
    }

    public void changePassword(ChangePasswordRequest request) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new NotFoundException("User tidak ditemukan"));

        if (!passwordEncoder.matches(request.getPasswordLama(), user.getPassword())) {
            throw new BusinessException("Password lama salah");
        }

        if (!request.getPasswordBaru().equals(request.getKonfirmasiPassword())) {
            throw new BusinessException("Konfirmasi password tidak sama");
        }

        if (request.getPasswordBaru().length() < 8) {
            throw new BusinessException("Password minimal 8 karakter");
        }

        if (passwordEncoder.matches(request.getPasswordBaru(), user.getPassword())) {
            throw new BusinessException("Password baru harus berbeda");
        }

        user.setPassword(passwordEncoder.encode(request.getPasswordBaru()));
        user.setUpdatedAt(LocalDateTime.now());

        userRepository.save(user);
    }

    public UserResponse uploadProfilePhoto(MultipartFile file) throws IOException {

        Authentication authentication
                = SecurityContextHolder.getContext().getAuthentication();

        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new NotFoundException("User tidak ditemukan"));

        if (file.isEmpty()) {
            throw new BusinessException("File tidak boleh kosong");
        }

        String fileName
                = System.currentTimeMillis() + "_" + file.getOriginalFilename();

        Path path = Paths.get(uploadPath);

        if (!Files.exists(path)) {
            Files.createDirectories(path);
        }

        Files.copy(
                file.getInputStream(),
                path.resolve(fileName),
                StandardCopyOption.REPLACE_EXISTING
        );

        user.setFotoProfil(fileName);
        user.setUpdatedAt(LocalDateTime.now());

        userRepository.save(user);

        return mapToResponse(user);
    }

}
