package pengaduan_desa.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class KomentarRequest {

    @NotBlank(message = "Isi komentar wajib diisi")
    private String isiKomentar;

    @NotNull(message = "Laporan wajib dipilih")
    private Long laporanId;
}
