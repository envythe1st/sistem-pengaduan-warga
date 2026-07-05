package pengaduan_desa.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class RegisterRequest {

    @NotBlank
    private String nama;

    @Email
    private String email;

    @NotBlank
    private String password;

    private String noHp;

    private String fotoProfil;

    private String bio;
}
