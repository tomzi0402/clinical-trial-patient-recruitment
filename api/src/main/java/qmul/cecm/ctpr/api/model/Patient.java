package qmul.cecm.ctpr.api.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.Period;

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

    @ManyToOne
    @JoinColumn(name = "gender_id")
    private Gender gender;

    @ManyToOne
    @JoinColumn(name = "condition_id")
    private Condition condition;

    private LocalDate recruitmentDate;

    @ManyToOne
    @JoinColumn(name = "study_id")
    private Study study;

    public int getAge() {
        return Period.between(dob, LocalDate.now()).getYears();
    }
}
