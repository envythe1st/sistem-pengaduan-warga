package pengaduan_desa.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import pengaduan_desa.dto.ApiResponse;
import pengaduan_desa.dto.FotoLaporanRequest;
import pengaduan_desa.dto.FotoLaporanResponse;
import pengaduan_desa.service.FotoLaporanService;

@RestController
@RequestMapping("/foto")
@RequiredArgsConstructor
public class FotoLaporanController {

    private final FotoLaporanService fotoLaporanService;

    @PostMapping
    public ApiResponse<FotoLaporanResponse> create(
            @Valid @RequestBody FotoLaporanRequest request) {

        FotoLaporanResponse response = fotoLaporanService.create(request);

        return ApiResponse.<FotoLaporanResponse>builder()
                .message("Foto laporan berhasil dibuat")
                .data(response)
                .build();
    }

    @PostMapping("/upload/{laporanId}")
    public ApiResponse<FotoLaporanResponse> upload(
            @PathVariable Long laporanId,
            @RequestParam MultipartFile file)
            throws IOException {

        FotoLaporanResponse response
                = fotoLaporanService.upload(laporanId, file);

        return ApiResponse.<FotoLaporanResponse>builder()
                .message("Upload berhasil")
                .data(response)
                .build();
    }

    @GetMapping
    public ApiResponse<List<FotoLaporanResponse>> getAll() {

        return ApiResponse.<List<FotoLaporanResponse>>builder()
                .message("Success")
                .data(fotoLaporanService.getAll())
                .build();
    }

    @GetMapping("/{id}")
    public ApiResponse<FotoLaporanResponse> getById(
            @PathVariable Long id) {

        return ApiResponse.<FotoLaporanResponse>builder()
                .message("Success")
                .data(fotoLaporanService.getById(id))
                .build();
    }

    @GetMapping("/laporan/{laporanId}")
    public ApiResponse<List<FotoLaporanResponse>> getByLaporan(
            @PathVariable Long laporanId) {

        return ApiResponse.<List<FotoLaporanResponse>>builder()
                .message("Success")
                .data(fotoLaporanService.getByLaporan(laporanId))
                .build();
    }

    @PutMapping("/{id}")
    public ApiResponse<FotoLaporanResponse> update(
            @PathVariable Long id,
            @Valid @RequestBody FotoLaporanRequest request) {

        FotoLaporanResponse response = fotoLaporanService.update(id, request);

        return ApiResponse.<FotoLaporanResponse>builder()
                .message("Foto laporan berhasil diupdate")
                .data(response)
                .build();
    }

    @DeleteMapping("/{id}")
    public ApiResponse<String> delete(
            @PathVariable Long id) {

        fotoLaporanService.delete(id);

        return ApiResponse.<String>builder()
                .message("Foto laporan berhasil dihapus")
                .data("OK")
                .build();
    }
}
