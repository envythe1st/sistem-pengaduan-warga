package pengaduan_desa.dto;

import lombok.Data;

@Data
public class ChangePasswordRequest {

    private String passwordLama;

    private String passwordBaru;

    private String konfirmasiPassword;

}
