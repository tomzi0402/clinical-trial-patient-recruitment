package qmul.cecm.ctpr.api;

import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import qmul.cecm.ctpr.api.model.Condition;
import qmul.cecm.ctpr.api.model.Gender;
import qmul.cecm.ctpr.api.model.Status;
import qmul.cecm.ctpr.api.repository.ConditionRepository;
import qmul.cecm.ctpr.api.repository.GenderRepository;
import qmul.cecm.ctpr.api.repository.StatusRepository;

@Configuration
public class InitialDataConfig {

    /**
     * Load initial data
     *
     * @param statusRepo
     * @return
     */
    @Bean
    public ApplicationRunner loadData(StatusRepository statusRepo, GenderRepository genderRepo, ConditionRepository conditionRepo) {
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
        };
    }
}
