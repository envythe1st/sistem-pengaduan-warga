package pengaduan_desa.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class LaporanRequest {

    @NotBlank(message = "Judul wajib diisi")
    private String judul;

    @NotBlank(message = "Deskripsi wajib diisi")
    private String deskripsi;

    @NotBlank(message = "Lokasi wajib diisi")
    private String lokasi;

    @NotNull(message = "Kategori wajib dipilih")
    private Long kategoriId;

}
