package pengaduan_desa.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "t_laporan")

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Laporan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String judul;

    @Column(columnDefinition = "TEXT")
    private String deskripsi;

    private String lokasi;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "kategori_id")
    private KategoriLaporan kategori;

    @ManyToOne
    @JoinColumn(name = "status_id")
    private StatusLaporan status;

    @Column(name = "tanggal_laporan")
    private LocalDateTime tanggalLaporan;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}
