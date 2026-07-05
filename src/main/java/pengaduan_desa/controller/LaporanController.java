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
import pengaduan_desa.dto.LaporanRequest;
import pengaduan_desa.dto.LaporanResponse;
import pengaduan_desa.dto.UpdateStatusRequest;
import pengaduan_desa.service.LaporanService;

@RestController
@RequestMapping("/laporan")
@RequiredArgsConstructor
public class LaporanController {

    private final LaporanService laporanService;

    @PostMapping
    public ApiResponse<LaporanResponse> create(
            @Valid @RequestBody LaporanRequest request) {

        LaporanResponse response
                = laporanService.create(request);

        return ApiResponse.<LaporanResponse>builder()
                .message("Laporan berhasil dibuat")
                .data(response)
                .build();
    }

    @GetMapping
    public ApiResponse<List<LaporanResponse>> getAll() {

        return ApiResponse.<List<LaporanResponse>>builder()
                .message("Success")
                .data(laporanService.getAll())
                .build();
    }

    @GetMapping("/{id}")
    public ApiResponse<LaporanResponse> getById(
            @PathVariable Long id) {

        return ApiResponse.<LaporanResponse>builder()
                .message("Success")
                .data(laporanService.getById(id))
                .build();
    }

    @GetMapping("/my")
    public ApiResponse<List<LaporanResponse>> getMyLaporan() {

        return ApiResponse.<List<LaporanResponse>>builder()
                .message("Success")
                .data(laporanService.getMyLaporan())
                .build();
    }

    @PutMapping("/{id}")
    public ApiResponse<LaporanResponse> update(
            @PathVariable Long id,
            @Valid @RequestBody LaporanRequest request) {

        LaporanResponse response = laporanService.update(id, request);

        return ApiResponse.<LaporanResponse>builder()
                .message("Laporan berhasil diupdate")
                .data(response)
                .build();
    }

    @PutMapping("/{id}/status")
    public ApiResponse<LaporanResponse> updateStatus(
            @PathVariable Long id,
            @RequestBody UpdateStatusRequest request) {

        LaporanResponse response
                = laporanService.updateStatus(id, request);

        return ApiResponse.<LaporanResponse>builder()
                .message("Status laporan berhasil diperbarui")
                .data(response)
                .build();
    }

    @DeleteMapping("/{id}")
    public ApiResponse<String> delete(
            @PathVariable Long id) {

        laporanService.delete(id);

        return ApiResponse.<String>builder()
                .message("Laporan berhasil dihapus")
                .data("OK")
                .build();
    }
}
