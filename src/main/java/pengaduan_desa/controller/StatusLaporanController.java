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
import pengaduan_desa.dto.StatusRequest;
import pengaduan_desa.dto.StatusResponse;
import pengaduan_desa.service.StatusLaporanService;

@RestController
@RequestMapping("/status")
@RequiredArgsConstructor
public class StatusLaporanController {

    private final StatusLaporanService statusLaporanService;

    @PostMapping
    public ApiResponse<StatusResponse> create(
            @Valid @RequestBody StatusRequest request) {

        StatusResponse response
                = statusLaporanService.create(request);

        return ApiResponse.<StatusResponse>builder()
                .message("Status laporan berhasil dibuat")
                .data(response)
                .build();
    }

    @GetMapping
    public ApiResponse<List<StatusResponse>> getAll() {

        return ApiResponse.<List<StatusResponse>>builder()
                .message("Success")
                .data(statusLaporanService.getAll())
                .build();
    }

    @GetMapping("/{id}")
    public ApiResponse<StatusResponse> getById(
            @PathVariable Long id) {

        return ApiResponse.<StatusResponse>builder()
                .message("Success")
                .data(statusLaporanService.getById(id))
                .build();
    }

    @PutMapping("/{id}")
    public ApiResponse<StatusResponse> update(
            @PathVariable Long id,
            @Valid @RequestBody StatusRequest request) {

        StatusResponse response
                = statusLaporanService.update(id, request);

        return ApiResponse.<StatusResponse>builder()
                .message("Status laporan berhasil diupdate")
                .data(response)
                .build();
    }

    @DeleteMapping("/{id}")
    public ApiResponse<String> delete(
            @PathVariable Long id) {

        statusLaporanService.delete(id);

        return ApiResponse.<String>builder()
                .message("Status laporan berhasil dihapus")
                .data("OK")
                .build();
    }
}
