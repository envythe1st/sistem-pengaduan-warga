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
import pengaduan_desa.dto.KomentarRequest;
import pengaduan_desa.dto.KomentarResponse;
import pengaduan_desa.service.KomentarService;

@RestController
@RequestMapping("/komentar")
@RequiredArgsConstructor
public class KomentarController {

    private final KomentarService komentarService;

    @PostMapping
    public ApiResponse<KomentarResponse> create(
            @Valid @RequestBody KomentarRequest request) {

        KomentarResponse response
                = komentarService.create(request);

        return ApiResponse.<KomentarResponse>builder()
                .message("Komentar berhasil dibuat")
                .data(response)
                .build();
    }

    @GetMapping
    public ApiResponse<List<KomentarResponse>> getAll() {

        return ApiResponse.<List<KomentarResponse>>builder()
                .message("Success")
                .data(komentarService.getAll())
                .build();
    }

    @GetMapping("/{id}")
    public ApiResponse<KomentarResponse> getById(
            @PathVariable Long id) {

        return ApiResponse.<KomentarResponse>builder()
                .message("Success")
                .data(komentarService.getById(id))
                .build();
    }

    @GetMapping("/laporan/{laporanId}")
    public ApiResponse<List<KomentarResponse>> getByLaporan(
            @PathVariable Long laporanId) {

        return ApiResponse.<List<KomentarResponse>>builder()
                .message("Success")
                .data(komentarService.getByLaporan(laporanId))
                .build();
    }

    @PutMapping("/{id}")
    public ApiResponse<KomentarResponse> update(
            @PathVariable Long id,
            @Valid @RequestBody KomentarRequest request) {

        KomentarResponse response
                = komentarService.update(id, request);

        return ApiResponse.<KomentarResponse>builder()
                .message("Komentar berhasil diupdate")
                .data(response)
                .build();
    }

    @DeleteMapping("/{id}")
    public ApiResponse<String> delete(
            @PathVariable Long id) {

        komentarService.delete(id);

        return ApiResponse.<String>builder()
                .message("Komentar berhasil dihapus")
                .data("OK")
                .build();
    }
}
