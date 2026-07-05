package pengaduan_desa.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class KategoriRequest {

    @NotBlank(message = "Nama kategori wajib diisi")
    private String namaKategori;
}
