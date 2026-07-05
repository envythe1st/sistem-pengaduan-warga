package pengaduan_desa.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import pengaduan_desa.dto.StatusRequest;
import pengaduan_desa.dto.StatusResponse;
import pengaduan_desa.entity.StatusLaporan;
import pengaduan_desa.exception.BusinessException;
import pengaduan_desa.exception.NotFoundException;
import pengaduan_desa.repository.StatusLaporanRepository;

@Service
@RequiredArgsConstructor
public class StatusLaporanService {

    private final StatusLaporanRepository statusLaporanRepository;

    public StatusResponse create(StatusRequest request) {

        if (statusLaporanRepository.existsByNamaStatus(
                request.getNamaStatus())) {

            throw new BusinessException(
                    "Status laporan sudah ada");
        }

        StatusLaporan status = StatusLaporan.builder()
                .namaStatus(request.getNamaStatus())
                .build();

        StatusLaporan saved = statusLaporanRepository.save(status);

        return StatusResponse.builder()
                .id(saved.getId())
                .namaStatus(saved.getNamaStatus())
                .build();
    }

    public List<StatusResponse> getAll() {

        return statusLaporanRepository.findAll()
                .stream()
                .map(status -> StatusResponse.builder()
                .id(status.getId())
                .namaStatus(status.getNamaStatus())
                .build())
                .collect(Collectors.toList());
    }

    public StatusResponse getById(Long id) {

        StatusLaporan status = statusLaporanRepository.findById(id)
                .orElseThrow(()
                        -> new NotFoundException("Status laporan tidak ditemukan"));

        return StatusResponse.builder()
                .id(status.getId())
                .namaStatus(status.getNamaStatus())
                .build();
    }

    public StatusResponse update(Long id, StatusRequest request) {

        StatusLaporan status = statusLaporanRepository.findById(id)
                .orElseThrow(()
                        -> new NotFoundException("Status laporan tidak ditemukan"));

        status.setNamaStatus(request.getNamaStatus());

        StatusLaporan updated = statusLaporanRepository.save(status);

        return StatusResponse.builder()
                .id(updated.getId())
                .namaStatus(updated.getNamaStatus())
                .build();
    }

    public void delete(Long id) {

        StatusLaporan status = statusLaporanRepository.findById(id)
                .orElseThrow(()
                        -> new NotFoundException("Status laporan tidak ditemukan"));

        statusLaporanRepository.delete(status);
    }
}
