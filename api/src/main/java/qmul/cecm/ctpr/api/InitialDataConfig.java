package qmul.cecm.ctpr.api;

import org.springframework.core.env.Environment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import qmul.cecm.ctpr.api.model.*;
import qmul.cecm.ctpr.api.repository.*;

import java.time.LocalDate;

@Configuration
public class InitialDataConfig {

    @Autowired
    Environment environment;

    /**
     * @param statusRepo
     * @param genderRepo
     * @param conditionRepo
     * @param studyRepo
     * @param patientRepo
     * @param studyPatientRepo
     * @return
     */
    @Bean
    public ApplicationRunner loadData(StatusRepository statusRepo, GenderRepository genderRepo, ConditionRepository conditionRepo, StudyRepository studyRepo, PatientRepository patientRepo, StudyPatientRepository studyPatientRepo) {
        return args -> {
            // load initial data for status
            statusRepo.save(new Status(1L, "Recruiting", true));
            statusRepo.save(new Status(2L, "Completed", false));
            statusRepo.save(new Status(3L, "Withdrawn", false));
            statusRepo.save(new Status(4L, "Terminated", false));
            statusRepo.save(new Status(5L, "Planning", false));
            // load initial data for gender
            genderRepo.save(new Gender(1L, "Male"));
            genderRepo.save(new Gender(2L, "Female"));
            // load initial data for condition
            conditionRepo.save(new Condition(1L, "Hypertension"));
            conditionRepo.save(new Condition(2L, "Diabetes"));
            conditionRepo.save(new Condition(3L, "Asthma"));
            conditionRepo.save(new Condition(4L, "Migraine"));

            // load preset data for development & testing only
            String activeProfile = environment.getActiveProfiles()[0];
            if ("dev".equalsIgnoreCase(activeProfile) || "test".equalsIgnoreCase(activeProfile)) {
                studyRepo.save(new Study(1L, "Effects of Sleep on Cognitive Performance", "Neuroscience", "Investigates how sleep duration impacts cognitive abilities", statusRepo.findById(1L).get()));
                studyRepo.save(new Study(2L, "Climate Change and Coastal Erosion", "Environmental Science", "Examines the relationship between climate change and coastal erosion rates", statusRepo.findById(2L).get()));
                studyRepo.save(new Study(3L, "AI in Medical Diagnosis", "Computer Science", "Evaluates the effectiveness of AI in diagnosing medical conditions", statusRepo.findById(3L).get()));
                studyRepo.save(new Study(4L, "Nutritional Impact on Adolescent Growth", "Nutrition", "Studies the effects of different diets on adolescent physical", statusRepo.findById(4L).get()));
                studyRepo.save(new Study(5L, "Renewable Energy Adoption in Urban Areas", "Energy Studies", "Analyses factors influencing the adoption of renewable energy in cities", statusRepo.findById(5L).get()));

                patientRepo.save(new Patient(1L, "John", "Smith", LocalDate.of(1990, 1, 31), genderRepo.findById(1L).get(), false));
                patientRepo.save(new Patient(2L, "Mary", "Johnson", LocalDate.of(1994, 5, 24), genderRepo.findById(2L).get(), false));

                studyPatientRepo.save(new StudyPatient(1L, studyRepo.findById(1L).get(), patientRepo.findById(1L).get(), conditionRepo.findById(1L).get(), 45, LocalDate.of(2024, 05, 05)));
                studyPatientRepo.save(new StudyPatient(2L, studyRepo.findById(4L).get(), patientRepo.findById(2L).get(), conditionRepo.findById(2L).get(), 32, LocalDate.of(2024, 05, 16)));
                studyPatientRepo.save(new StudyPatient(3L, studyRepo.findById(5L).get(), patientRepo.findById(1L).get(), conditionRepo.findById(3L).get(), 43, LocalDate.of(2022, 07, 03)));
            }
        };
    }
}

