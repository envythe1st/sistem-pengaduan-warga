package pengaduan_desa.service;

import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import pengaduan_desa.dto.KomentarRequest;
import pengaduan_desa.dto.KomentarResponse;
import pengaduan_desa.entity.Komentar;
import pengaduan_desa.entity.Laporan;
import pengaduan_desa.entity.User;
import pengaduan_desa.exception.NotFoundException;
import pengaduan_desa.repository.KomentarRepository;
import pengaduan_desa.repository.LaporanRepository;
import pengaduan_desa.repository.UserRepository;
import pengaduan_desa.exception.ForbiddenException;

@Service
@RequiredArgsConstructor
public class KomentarService {

    private final KomentarRepository komentarRepository;
    private final UserRepository userRepository;
    private final LaporanRepository laporanRepository;

    public KomentarResponse create(KomentarRequest request) {

        Authentication authentication
                = SecurityContextHolder.getContext().getAuthentication();

        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(()
                        -> new NotFoundException("User tidak ditemukan"));

        Laporan laporan = laporanRepository.findById(request.getLaporanId())
                .orElseThrow(()
                        -> new NotFoundException("Laporan tidak ditemukan"));

        Komentar komentar = Komentar.builder()
                .isiKomentar(request.getIsiKomentar())
                .user(user)
                .laporan(laporan)
                .build();

        Komentar savedKomentar = komentarRepository.save(komentar);

        return mapToResponse(savedKomentar);
    }

    public List<KomentarResponse> getAll() {
        return komentarRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    public KomentarResponse getById(Long id) {

        Komentar komentar = komentarRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Komentar tidak ditemukan"));

        return mapToResponse(komentar);
    }

    public List<KomentarResponse> getByLaporan(Long laporanId) {

        return komentarRepository
                .findByLaporanIdOrderByCreatedAtAsc(laporanId)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    public KomentarResponse update(Long id, KomentarRequest request) {

        Komentar komentar = komentarRepository.findById(id)
                .orElseThrow(()
                        -> new NotFoundException("Komentar tidak ditemukan"));

        Authentication authentication
                = SecurityContextHolder.getContext().getAuthentication();

        String email = authentication.getName();

        User currentUser = userRepository.findByEmail(email)
                .orElseThrow(()
                        -> new NotFoundException("User tidak ditemukan"));

        // Hanya pemilik komentar yang boleh mengedit
        if (!komentar.getUser().getId().equals(currentUser.getId())) {
            throw new ForbiddenException(
                    "Anda tidak memiliki izin untuk mengubah komentar ini.");
        }

        Laporan laporan = laporanRepository.findById(request.getLaporanId())
                .orElseThrow(()
                        -> new NotFoundException("Laporan tidak ditemukan"));

        komentar.setIsiKomentar(request.getIsiKomentar());
        komentar.setLaporan(laporan);

        Komentar updatedKomentar = komentarRepository.save(komentar);

        return mapToResponse(updatedKomentar);
    }

    public void delete(Long id) {

        Komentar komentar = komentarRepository.findById(id)
                .orElseThrow(()
                        -> new NotFoundException("Komentar tidak ditemukan"));

        Authentication authentication
                = SecurityContextHolder.getContext().getAuthentication();

        String email = authentication.getName();

        User currentUser = userRepository.findByEmail(email)
                .orElseThrow(()
                        -> new NotFoundException("User tidak ditemukan"));

        boolean owner
                = komentar.getUser().getId().equals(currentUser.getId());

        boolean superAdmin
                = currentUser.getRole().getNamaRole().equals("SUPER_ADMIN");

        if (!owner && !superAdmin) {
            throw new ForbiddenException(
                    "Anda tidak memiliki izin untuk menghapus komentar ini.");
        }

        komentarRepository.delete(komentar);
    }

    private KomentarResponse mapToResponse(Komentar komentar) {

        return KomentarResponse.builder()
                .id(komentar.getId())
                .isiKomentar(komentar.getIsiKomentar())
                .namaUser(komentar.getUser().getNama())
                .userId(komentar.getUser().getId())
                .laporanId(komentar.getLaporan().getId())
                .judulLaporan(komentar.getLaporan().getJudul())
                .createdAt(komentar.getCreatedAt())
                .build();
    }
}
