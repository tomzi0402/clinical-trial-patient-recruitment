package qmul.cecm.ctpr.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import qmul.cecm.ctpr.api.model.Study;

import java.util.List;

@Repository
public interface StudyRepository extends JpaRepository<Study, Long> {

    @Query("SELECT study FROM Study study JOIN study.status status WHERE status.allowRecruit = TRUE")
    List<Study> findAllowRecruitingStudies();
}
