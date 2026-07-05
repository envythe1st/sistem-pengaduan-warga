package pengaduan_desa.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import pengaduan_desa.dto.KategoriRequest;
import pengaduan_desa.dto.KategoriResponse;
import pengaduan_desa.entity.KategoriLaporan;
import pengaduan_desa.exception.BusinessException;
import pengaduan_desa.exception.NotFoundException;
import pengaduan_desa.repository.KategoriLaporanRepository;

@Service
@RequiredArgsConstructor
public class KategoriLaporanService {

    private final KategoriLaporanRepository kategoriLaporanRepository;

    public KategoriResponse create(KategoriRequest request) {

        if (kategoriLaporanRepository.existsByNamaKategori(
                request.getNamaKategori())) {

            throw new BusinessException(
                    "Kategori sudah ada");
        }

        KategoriLaporan kategori = KategoriLaporan.builder()
                .namaKategori(request.getNamaKategori())
                .build();

        KategoriLaporan saved = kategoriLaporanRepository.save(kategori);

        return KategoriResponse.builder()
                .id(saved.getId())
                .namaKategori(saved.getNamaKategori())
                .build();
    }

    public List<KategoriResponse> getAll() {

        return kategoriLaporanRepository.findAll()
                .stream()
                .map(kategori -> KategoriResponse.builder()
                .id(kategori.getId())
                .namaKategori(kategori.getNamaKategori())
                .build())
                .collect(Collectors.toList());
    }

    public KategoriResponse getById(Long id) {

        KategoriLaporan kategori = kategoriLaporanRepository.findById(id)
                .orElseThrow(()
                        -> new NotFoundException("Kategori laporan tidak ditemukan"));

        return KategoriResponse.builder()
                .id(kategori.getId())
                .namaKategori(kategori.getNamaKategori())
                .build();
    }

    public KategoriResponse update(Long id, KategoriRequest request) {

        KategoriLaporan kategori = kategoriLaporanRepository.findById(id)
                .orElseThrow(()
                        -> new NotFoundException("Kategori laporan tidak ditemukan"));

        kategori.setNamaKategori(request.getNamaKategori());

        KategoriLaporan updated = kategoriLaporanRepository.save(kategori);

        return KategoriResponse.builder()
                .id(updated.getId())
                .namaKategori(updated.getNamaKategori())
                .build();
    }

    public void delete(Long id) {

        KategoriLaporan kategori = kategoriLaporanRepository.findById(id)
                .orElseThrow(()
                        -> new NotFoundException("Kategori laporan tidak ditemukan"));

        kategoriLaporanRepository.delete(kategori);
    }
}
