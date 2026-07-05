package pengaduan_desa.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import pengaduan_desa.dto.ApiResponse;
import pengaduan_desa.dto.KategoriRequest;
import pengaduan_desa.dto.KategoriResponse;
import pengaduan_desa.service.KategoriLaporanService;

@RestController
@RequestMapping("/kategori")
@RequiredArgsConstructor
public class KategoriLaporanController {

    private final KategoriLaporanService kategoriLaporanService;

    @PostMapping
    public ApiResponse<KategoriResponse> create(
            @Valid @RequestBody KategoriRequest request) {

        KategoriResponse response
                = kategoriLaporanService.create(request);

        return ApiResponse.<KategoriResponse>builder()
                .message("Kategori berhasil dibuat")
                .data(response)
                .build();
    }

    @GetMapping
    public ApiResponse<List<KategoriResponse>> getAll() {

        return ApiResponse.<List<KategoriResponse>>builder()
                .message("Success")
                .data(kategoriLaporanService.getAll())
                .build();
    }

    @GetMapping("/{id}")
    public ApiResponse<KategoriResponse> getById(
            @PathVariable Long id) {

        return ApiResponse.<KategoriResponse>builder()
                .message("Success")
                .data(kategoriLaporanService.getById(id))
                .build();
    }

    @PutMapping("/{id}")
    public ApiResponse<KategoriResponse> update(
            @PathVariable Long id,
            @Valid @RequestBody KategoriRequest request) {

        KategoriResponse response
                = kategoriLaporanService.update(id, request);

        return ApiResponse.<KategoriResponse>builder()
                .message("Kategori berhasil diupdate")
                .data(response)
                .build();
    }

    @DeleteMapping("/{id}")
    public ApiResponse<String> delete(
            @PathVariable Long id) {

        kategoriLaporanService.delete(id);

        return ApiResponse.<String>builder()
                .message("Kategori berhasil dihapus")
                .data("OK")
                .build();
    }
}
