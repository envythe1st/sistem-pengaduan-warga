package pengaduan_desa.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import pengaduan_desa.dto.LaporanRequest;
import pengaduan_desa.dto.LaporanResponse;
import pengaduan_desa.dto.UpdateStatusRequest;
import pengaduan_desa.entity.KategoriLaporan;
import pengaduan_desa.entity.Laporan;
import pengaduan_desa.entity.StatusLaporan;
import pengaduan_desa.entity.User;
import pengaduan_desa.exception.NotFoundException;
import pengaduan_desa.repository.KategoriLaporanRepository;
import pengaduan_desa.repository.LaporanRepository;
import pengaduan_desa.repository.StatusLaporanRepository;
import pengaduan_desa.repository.UserRepository;

@Service
@RequiredArgsConstructor
public class LaporanService {

    private final LaporanRepository laporanRepository;
    private final UserRepository userRepository;
    private final KategoriLaporanRepository kategoriRepository;
    private final StatusLaporanRepository statusRepository;

    private LaporanResponse convertToResponse(Laporan laporan) {
        return LaporanResponse.builder()
                .id(laporan.getId())
                .judul(laporan.getJudul())
                .deskripsi(laporan.getDeskripsi())
                .lokasi(laporan.getLokasi())
                .namaUser(laporan.getUser().getNama())
                .kategoriId(laporan.getKategori().getId())
                .namaKategori(laporan.getKategori().getNamaKategori())
                .statusId(laporan.getStatus().getId())
                .namaStatus(laporan.getStatus().getNamaStatus())
                .tanggalLaporan(laporan.getTanggalLaporan())
                .build();
    }

    private User getCurrentUser() {

        Authentication authentication
                = SecurityContextHolder.getContext().getAuthentication();

        String email = authentication.getName();

        return userRepository.findByEmail(email)
                .orElseThrow(()
                        -> new NotFoundException("User tidak ditemukan"));
    }

    public LaporanResponse create(LaporanRequest request) {

        User user = getCurrentUser();

        KategoriLaporan kategori = kategoriRepository.findById(request.getKategoriId())
                .orElseThrow(()
                        -> new NotFoundException("Kategori laporan tidak ditemukan"));

        StatusLaporan status = statusRepository
                .findByNamaStatus("MENUNGGU")
                .orElseThrow(()
                        -> new NotFoundException("Status MENUNGGU tidak ditemukan"));

        Laporan laporan = Laporan.builder()
                .judul(request.getJudul())
                .deskripsi(request.getDeskripsi())
                .lokasi(request.getLokasi())
                .user(user)
                .kategori(kategori)
                .status(status)
                .tanggalLaporan(LocalDateTime.now())
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        return convertToResponse(
                laporanRepository.save(laporan));
    }

    public List<LaporanResponse> getAll() {
        return laporanRepository
                .findAllByOrderByTanggalLaporanDesc()
                .stream()
                .map(this::convertToResponse)
                .toList();
    }

    public LaporanResponse getById(Long id) {

        Laporan laporan = laporanRepository.findById(id)
                .orElseThrow(()
                        -> new NotFoundException("Laporan tidak ditemukan"));

        return convertToResponse(laporan);
    }

    public List<LaporanResponse> getMyLaporan() {

        Authentication authentication
                = SecurityContextHolder.getContext().getAuthentication();

        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(()
                        -> new NotFoundException("User tidak ditemukan"));

        return laporanRepository
                .findByUserOrderByTanggalLaporanDesc(user)
                .stream()
                .map(this::convertToResponse)
                .toList();
    }

    public LaporanResponse update(Long id, LaporanRequest request) {

        User currentUser = getCurrentUser();

        Laporan laporan = laporanRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Laporan tidak ditemukan"));

        // Pastikan hanya pemilik laporan yang bisa mengedit
        if (!laporan.getUser().getId().equals(currentUser.getId())) {
            throw new RuntimeException("Anda tidak memiliki akses untuk mengubah laporan ini.");
        }

        // Hanya boleh edit saat status MENUNGGU
        if (!laporan.getStatus().getNamaStatus().equalsIgnoreCase("MENUNGGU")) {
            throw new RuntimeException("Laporan tidak dapat diubah karena sedang diproses.");
        }

        KategoriLaporan kategori = kategoriRepository.findById(request.getKategoriId())
                .orElseThrow(() -> new NotFoundException("Kategori laporan tidak ditemukan"));

        laporan.setJudul(request.getJudul());
        laporan.setDeskripsi(request.getDeskripsi());
        laporan.setLokasi(request.getLokasi());
        laporan.setKategori(kategori);
        laporan.setUpdatedAt(LocalDateTime.now());

        return convertToResponse(
                laporanRepository.save(laporan));
    }

    public LaporanResponse updateStatus(Long id, UpdateStatusRequest request) {

        Laporan laporan = laporanRepository.findById(id)
                .orElseThrow(()
                        -> new NotFoundException("Laporan tidak ditemukan"));

        StatusLaporan status = statusRepository.findById(request.getStatusId())
                .orElseThrow(()
                        -> new NotFoundException("Status tidak ditemukan"));

        laporan.setStatus(status);
        laporan.setUpdatedAt(LocalDateTime.now());

        return convertToResponse(
                laporanRepository.save(laporan));
    }

    public void delete(Long id) {

        Laporan laporan = laporanRepository.findById(id)
                .orElseThrow(()
                        -> new NotFoundException("Laporan tidak ditemukan"));

        laporanRepository.delete(laporan);
    }
}
