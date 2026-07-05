package pengaduan_desa.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class StatusRequest {

    @NotBlank(message = "Nama status wajib diisi")
    private String namaStatus;
}
