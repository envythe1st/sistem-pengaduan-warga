package pengaduan_desa.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import pengaduan_desa.dto.ApiResponse;
import pengaduan_desa.dto.ChangePasswordRequest;
import pengaduan_desa.dto.UpdateProfileRequest;
import pengaduan_desa.dto.UserRequest;
import pengaduan_desa.dto.UserResponse;
import pengaduan_desa.service.UserService;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    // ========================= CREATE USER =========================
    @PostMapping
    public ApiResponse<UserResponse> createUser(
            @Valid @RequestBody UserRequest request) {

        return ApiResponse.<UserResponse>builder()
                .message("User berhasil dibuat")
                .data(userService.create(request))
                .build();
    }

    // ========================= UPLOAD FOTO =========================
    @PostMapping(
            value = "/upload-photo",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public ResponseEntity<ApiResponse<UserResponse>> uploadPhoto(
            @RequestPart("foto") MultipartFile foto)
            throws IOException {

        return ResponseEntity.ok(
                ApiResponse.<UserResponse>builder()
                        .message("Foto profil berhasil diupload")
                        .data(userService.uploadPhoto(foto))
                        .build()
        );
    }

    // ========================= GET ALL =========================
    @GetMapping
    public ApiResponse<List<UserResponse>> getAllUsers() {

        return ApiResponse.<List<UserResponse>>builder()
                .message("Success")
                .data(userService.getAll())
                .build();
    }

    @GetMapping("/page")
    public Page<UserResponse> getAllPage(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size) {

        return userService.getAll(page, size);
    }

    @GetMapping("/sort")
    public ApiResponse<List<UserResponse>> getAllSorted(
            @RequestParam String sortBy) {

        return ApiResponse.<List<UserResponse>>builder()
                .message("Success")
                .data(userService.getAllSorted(sortBy))
                .build();
    }

    @GetMapping("/search")
    public ApiResponse<List<UserResponse>> search(
            @RequestParam String keyword) {

        return ApiResponse.<List<UserResponse>>builder()
                .message("Success")
                .data(userService.search(keyword))
                .build();
    }

    // ========================= CURRENT USER =========================
    @GetMapping("/me")
    public ApiResponse<UserResponse> getCurrentUser() {

        return ApiResponse.<UserResponse>builder()
                .message("Success")
                .data(userService.getCurrentUser())
                .build();
    }

    // ========================= GET BY ID =========================
    @GetMapping("/{id}")
    public ApiResponse<UserResponse> getUserById(
            @PathVariable Long id) {

        return ApiResponse.<UserResponse>builder()
                .message("Success")
                .data(userService.getById(id))
                .build();
    }

    // ========================= UPDATE USER =========================
    @PutMapping("/{id}")
    public ApiResponse<UserResponse> updateUser(
            @PathVariable Long id,
            @Valid @RequestBody UserRequest request) {

        return ApiResponse.<UserResponse>builder()
                .message("User berhasil diupdate")
                .data(userService.update(id, request))
                .build();
    }

    // ========================= UPDATE PROFILE =========================
    @PutMapping("/me")
    public ApiResponse<UserResponse> updateCurrentUser(
            @Valid @RequestBody UpdateProfileRequest request) {

        return ApiResponse.<UserResponse>builder()
                .message("Profil berhasil diperbarui")
                .data(userService.updateCurrentUser(request))
                .build();
    }

    // ========================= CHANGE PASSWORD =========================
    @PutMapping("/change-password")
    public ResponseEntity<ApiResponse<String>> changePassword(
            @Valid @RequestBody ChangePasswordRequest request) {

        userService.changePassword(request);

        return ResponseEntity.ok(
                ApiResponse.<String>builder()
                        .message("Password berhasil diubah")
                        .data("OK")
                        .build()
        );
    }

    // ========================= DELETE USER =========================
    @DeleteMapping("/{id}")
    public ApiResponse<String> deleteUser(
            @PathVariable Long id) {

        userService.delete(id);

        return ApiResponse.<String>builder()
                .message("User berhasil dihapus")
                .data("OK")
                .build();
    }
}
