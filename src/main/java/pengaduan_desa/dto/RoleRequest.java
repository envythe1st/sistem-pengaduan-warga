package pengaduan_desa.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RoleRequest {

    @NotBlank(message = "Nama role wajib diisi")
    private String namaRole;
}
