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
public class KomentarResponse {

    private Long id;
    private String isiKomentar;

    private String namaUser;
    private String judulLaporan;
    private Long laporanId;
    private Long userId;
    private LocalDateTime createdAt;

}
