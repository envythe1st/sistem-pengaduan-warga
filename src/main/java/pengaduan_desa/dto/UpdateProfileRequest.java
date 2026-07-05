package pengaduan_desa.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateProfileRequest {

    @NotBlank(message = "Nama wajib diisi")
    private String nama;

    @Email(message = "Format email tidak valid")
    @NotBlank(message = "Email wajib diisi")
    private String email;

    private String noHp;

    private String alamat;

    private String bio;

    private String fotoProfil;
}
