package pengaduan_desa.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FotoLaporanRequest {

    @NotNull(message = "Laporan wajib dipilih")
    private Long laporanId;

    @NotBlank(message = "Path foto wajib diisi")
    private String pathFoto;
}
