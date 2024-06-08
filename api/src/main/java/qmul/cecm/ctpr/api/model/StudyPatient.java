package qmul.cecm.ctpr.api.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class StudyPatient {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "study_id")
    private Study study;
    @ManyToOne
    @JoinColumn(name = "patient_id")
    private Patient patient;
}
