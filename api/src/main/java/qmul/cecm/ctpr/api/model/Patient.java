package qmul.cecm.ctpr.api.model;

import jakarta.persistence.*;
import lombok.*;

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
    private String name;
    private Integer age;
    @ManyToOne
    @JoinColumn(name = "gender_id")
    private Gender gender;
    @ManyToOne
    @JoinColumn(name = "condition_id")
    private Condition condition;
    private LocalDate recruitmentDate;
}
