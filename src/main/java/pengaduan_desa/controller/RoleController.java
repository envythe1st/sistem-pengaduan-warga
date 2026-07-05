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
import pengaduan_desa.dto.RoleRequest;
import pengaduan_desa.dto.RoleResponse;
import pengaduan_desa.service.RoleService;

@RestController
@RequestMapping("/roles")
@RequiredArgsConstructor
public class RoleController {

    private final RoleService roleService;

    @PostMapping
    public ApiResponse<RoleResponse> createRole(
            @Valid @RequestBody RoleRequest request) {

        RoleResponse response = roleService.create(request);

        return ApiResponse.<RoleResponse>builder()
                .message("Role berhasil dibuat")
                .data(response)
                .build();
    }

    @GetMapping
    public ApiResponse<List<RoleResponse>> getAllRoles() {

        return ApiResponse.<List<RoleResponse>>builder()
                .message("Success")
                .data(roleService.getAll())
                .build();
    }

    @GetMapping("/{id}")
    public ApiResponse<RoleResponse> getRoleById(
            @PathVariable Long id) {

        return ApiResponse.<RoleResponse>builder()
                .message("Success")
                .data(roleService.getById(id))
                .build();
    }

    @PutMapping("/{id}")
    public ApiResponse<RoleResponse> updateRole(
            @PathVariable Long id,
            @Valid @RequestBody RoleRequest request) {

        RoleResponse response = roleService.update(id, request);

        return ApiResponse.<RoleResponse>builder()
                .message("Role berhasil diupdate")
                .data(response)
                .build();
    }

    @DeleteMapping("/{id}")
    public ApiResponse<String> deleteRole(
            @PathVariable Long id) {

        roleService.delete(id);

        return ApiResponse.<String>builder()
                .message("Role berhasil dihapus")
                .data("OK")
                .build();
    }
}
