package pengaduan_desa.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserResponse {

    private Long id;
    private String nama;
    private String email;
    private String namaRole;

    private String noHp;
    private String alamat;
    private String fotoProfil;
    private LocalDateTime updatedAt;
    private String bio;
}
