package pengaduan_desa.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import lombok.RequiredArgsConstructor;
import pengaduan_desa.dto.FotoLaporanRequest;
import pengaduan_desa.dto.FotoLaporanResponse;
import pengaduan_desa.entity.FotoLaporan;
import pengaduan_desa.entity.Laporan;
import pengaduan_desa.exception.NotFoundException;
import pengaduan_desa.repository.FotoLaporanRepository;
import pengaduan_desa.repository.LaporanRepository;

@Service
@RequiredArgsConstructor
public class FotoLaporanService {

    private final FotoLaporanRepository fotoLaporanRepository;
    private final LaporanRepository laporanRepository;

    private final String uploadDir = "uploads/laporan/";

    private FotoLaporanResponse convertToResponse(FotoLaporan foto) {

        return FotoLaporanResponse.builder()
                .id(foto.getId())
                .pathFoto(foto.getPathFoto())
                .judulLaporan(foto.getLaporan().getJudul())
                .build();
    }

    public FotoLaporanResponse create(FotoLaporanRequest request) {

        Laporan laporan = laporanRepository.findById(request.getLaporanId())
                .orElseThrow(() -> new NotFoundException("Laporan tidak ditemukan"));

        FotoLaporan foto = FotoLaporan.builder()
                .laporan(laporan)
                .pathFoto(request.getPathFoto())
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        return convertToResponse(
                fotoLaporanRepository.save(foto));
    }

    public FotoLaporanResponse upload(Long laporanId, MultipartFile file) throws IOException {

        Laporan laporan = laporanRepository.findById(laporanId)
                .orElseThrow(()
                        -> new NotFoundException("Laporan tidak ditemukan"));

        Files.createDirectories(Paths.get(uploadDir));

        String fileName
                = System.currentTimeMillis() + "_" + file.getOriginalFilename();

        Path path = Paths.get(uploadDir, fileName);

        Files.copy(
                file.getInputStream(),
                path,
                StandardCopyOption.REPLACE_EXISTING);

        FotoLaporan foto = FotoLaporan.builder()
                .laporan(laporan)
                .pathFoto("uploads/laporan/" + fileName)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        return convertToResponse(
                fotoLaporanRepository.save(foto));
    }

    public List<FotoLaporanResponse> getAll() {

        return fotoLaporanRepository.findAll()
                .stream()
                .map(this::convertToResponse)
                .toList();
    }

    public List<FotoLaporanResponse> getByLaporan(Long laporanId) {

        return fotoLaporanRepository.findByLaporanId(laporanId)
                .stream()
                .map(this::convertToResponse)
                .toList();
    }

    public FotoLaporanResponse getById(Long id) {

        FotoLaporan foto = fotoLaporanRepository.findById(id)
                .orElseThrow(()
                        -> new NotFoundException("Foto laporan tidak ditemukan"));

        return convertToResponse(foto);
    }

    public FotoLaporanResponse update(Long id,
            FotoLaporanRequest request) {

        FotoLaporan foto = fotoLaporanRepository.findById(id)
                .orElseThrow(()
                        -> new NotFoundException("Foto laporan tidak ditemukan"));

        Laporan laporan = laporanRepository.findById(request.getLaporanId())
                .orElseThrow(()
                        -> new NotFoundException("Laporan tidak ditemukan"));

        foto.setLaporan(laporan);
        foto.setPathFoto(request.getPathFoto());
        foto.setUpdatedAt(LocalDateTime.now());

        return convertToResponse(
                fotoLaporanRepository.save(foto));
    }

    public void delete(Long id) {

        FotoLaporan foto = fotoLaporanRepository.findById(id)
                .orElseThrow(()
                        -> new NotFoundException("Foto laporan tidak ditemukan"));

        fotoLaporanRepository.delete(foto);
    }
}
