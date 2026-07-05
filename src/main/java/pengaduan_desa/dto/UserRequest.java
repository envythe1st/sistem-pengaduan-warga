package pengaduan_desa.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserRequest {

    @NotBlank(message = "Nama wajib diisi")
    private String nama;

    @Email(message = "Format email tidak valid")
    @NotBlank(message = "Email wajib diisi")
    private String email;

    @NotBlank(message = "Password wajib diisi")
    private String password;

    @NotNull(message = "Role wajib dipilih")
    private Long roleId;

    private String noHp;
    private String alamat;
    private String fotoProfil;
    private String bio;
}
