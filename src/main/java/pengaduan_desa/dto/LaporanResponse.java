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
public class LaporanResponse {

    private Long id;

    private String judul;
    private String deskripsi;
    private String lokasi;

    private String namaUser;
    private Long kategoriId;
    private Long statusId;

    private String namaKategori;
    private String namaStatus;

    private LocalDateTime tanggalLaporan;
}
