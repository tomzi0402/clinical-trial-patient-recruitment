package qmul.cecm.ctpr.api.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import java.time.LocalDate;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@ToString
public class Patient {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String firstName;
    private String lastName;
    private LocalDate dob;
    ;
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "gender_id")
    private Gender gender;
    private Boolean isDeleted;
}
