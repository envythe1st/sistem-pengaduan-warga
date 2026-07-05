package pengaduan_desa.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LoginResponse {

    private Long id;
    private String nama;
    private String token;
    private String email;
    private String role;
}
