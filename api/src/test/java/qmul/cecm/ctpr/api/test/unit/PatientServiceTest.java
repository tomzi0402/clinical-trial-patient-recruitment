package qmul.cecm.ctpr.api.test.unit;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.data.domain.Sort;
import qmul.cecm.ctpr.api.model.*;
import qmul.cecm.ctpr.api.repository.ConditionRepository;
import qmul.cecm.ctpr.api.repository.GenderRepository;
import qmul.cecm.ctpr.api.repository.PatientRepository;
import qmul.cecm.ctpr.api.repository.StudyRepository;
import qmul.cecm.ctpr.api.service.PatientService;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;

public class PatientServiceTest {

    @Mock
    private PatientRepository patientRepo;

    @InjectMocks
    private PatientService patientService;

    private List<Patient> mockPatients;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        Gender male = new Gender(1L, "Male");
        Gender female = new Gender(2L, "Female");
        Condition hypertension = new Condition(1L, "Hypertension");
        Condition diabetes = new Condition(2L, "Diabetes");
        Condition asthma = new Condition(3L, "Asthma");
        Study neuroscience = new Study(1L, "Effects of Sleep on Cognitive Performance", "Neuroscience", "Investigates how sleep duration impacts cognitive abilities", new Status(1L, "Recruiting", true));
        Study nutritional = new Study(4L, "Nutritional Impact on Adolescent Growth", "Nutrition", "Studies the effects of different diets on adolescent physical", new Status(4L, "Terminated", false));
        mockPatients = List.of(
                new Patient(1L, "John", "Smith", LocalDate.of(1990, 1, 31), male, hypertension, LocalDate.of(2024, 05, 05), neuroscience),
                new Patient(2L, "Mary", "Johnson", LocalDate.of(1994, 5, 24), female, diabetes, LocalDate.of(2024, 05, 16), neuroscience),
                new Patient(3L, "Robert", "Brown", LocalDate.of(1980, 7, 3), male, asthma, LocalDate.of(2022, 07, 03), nutritional)
        );
    }

    @Test
    public void testGetAllPatients() {
        given(patientRepo.findAll(Sort.by(Sort.Order.desc("recruitmentDate")))).willReturn(mockPatients);
        List<Patient> foundStudies = patientService.getAllPatients();
        assertEquals(mockPatients.size(), foundStudies.size());
        assertEquals(mockPatients, foundStudies);
    }

    @Test
    public void testGetPatientById() {
        given(patientRepo.findById(mockPatients.getFirst().getId())).willReturn(Optional.of(mockPatients.getFirst()));
        Patient foundPatient = patientService.getPatientById(mockPatients.getFirst().getId());
        assertEquals(mockPatients.getFirst(), foundPatient);
    }

    @Test
    public void testCreatePatient() {
        given(patientRepo.save(any(Patient.class))).willReturn(mockPatients.getLast());
        Patient createdPatient = patientService.createPatient(mockPatients.getLast());
        assertEquals(mockPatients.getLast(), createdPatient);
    }

    @Test
    public void testUpdatePatient() {
        Patient firstPatient = mockPatients.getFirst();
        Condition updatedCondition = new Condition(1L, "Excellent");
        Patient updatedPatient = new Patient(firstPatient.getId(), "Acorns", firstPatient.getLastName(), firstPatient.getDob(), firstPatient.getGender(), updatedCondition, firstPatient.getRecruitmentDate(), firstPatient.getStudy());
        given(patientRepo.existsById(firstPatient.getId())).willReturn(true);
        given(patientRepo.save(any(Patient.class))).willReturn(updatedPatient);

        Patient result = patientService.updatePatient(updatedPatient);
        assertEquals(updatedPatient.getFirstName(), result.getFirstName());
        assertEquals(updatedPatient.getCondition(), result.getCondition());
    }

    @Test
    public void testDeletePatient() {
        Patient firstPatient = mockPatients.getFirst();
        given(patientRepo.existsById(firstPatient.getId())).willReturn(true);
        assertDoesNotThrow(() -> patientService.deletePatient(firstPatient.getId()));
    }
}
