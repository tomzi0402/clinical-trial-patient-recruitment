package qmul.cecm.ctpr.api.model;


import jakarta.persistence.*;
import lombok.*;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@ToString
public class Study {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String title;
    private String therapeutics;
    private String description;
    @ManyToOne
    @JoinColumn(name = "status_id")
    private Status status;

    public String getName() {
        return therapeutics;
    }
}
