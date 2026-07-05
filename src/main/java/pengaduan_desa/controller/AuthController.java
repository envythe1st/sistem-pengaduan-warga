package pengaduan_desa.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import pengaduan_desa.dto.ApiResponse;
import pengaduan_desa.dto.LoginRequest;
import pengaduan_desa.dto.LoginResponse;
import pengaduan_desa.dto.RegisterRequest;
import pengaduan_desa.service.AuthService;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ApiResponse<String> register(
            @Valid @RequestBody RegisterRequest request) {

        return ApiResponse.<String>builder()
                .message("Success")
                .data(authService.register(request))
                .build();
    }

    @PostMapping("/login")
    public ApiResponse<LoginResponse> login(
            @Valid @RequestBody LoginRequest request) {

        return ApiResponse.<LoginResponse>builder()
                .message("Success")
                .data(authService.login(request))
                .build();
    }
}
