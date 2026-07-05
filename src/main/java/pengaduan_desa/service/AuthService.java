package pengaduan_desa.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import pengaduan_desa.dto.LoginRequest;
import pengaduan_desa.dto.LoginResponse;
import pengaduan_desa.dto.RegisterRequest;
import pengaduan_desa.entity.Role;
import pengaduan_desa.entity.User;
import pengaduan_desa.exception.BusinessException;
import pengaduan_desa.repository.RoleRepository;
import pengaduan_desa.repository.UserRepository;
import pengaduan_desa.security.JwtService;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;

    public String register(RegisterRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new BusinessException(
                    "Email sudah digunakan");
        }

        Role role = roleRepository
                .findByNamaRole("WARGA")
                .orElseThrow(()
                        -> new BusinessException("Role WARGA tidak ditemukan"));

        User user = new User();

        user.setNama(request.getNama());
        user.setEmail(request.getEmail());
        user.setPassword(
                passwordEncoder.encode(request.getPassword())
        );
        user.setRole(role);
        user.setNoHp(request.getNoHp());
        user.setFotoProfil(request.getFotoProfil());
        user.setBio(request.getBio());

        userRepository.save(user);

        return "Register berhasil";
    }

    public LoginResponse login(LoginRequest request) {

        User user = userRepository
                .findByEmail(request.getEmail())
                .orElseThrow(()
                        -> new BusinessException(
                        "Email tidak ditemukan"));

        if (!passwordEncoder.matches(
                request.getPassword(),
                user.getPassword()
        )) {
            throw new RuntimeException("Password salah");
        }

        String token
                = jwtService.generateToken(
                        user.getEmail());

        return new LoginResponse(
                user.getId(),
                user.getNama(),
                token,
                user.getEmail(),
                user.getRole().getNamaRole()
        );
    }
}
