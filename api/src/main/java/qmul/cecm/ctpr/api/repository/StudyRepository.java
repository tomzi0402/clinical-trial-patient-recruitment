package qmul.cecm.ctpr.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import qmul.cecm.ctpr.api.model.Study;

@Repository
public interface StudyRepository extends JpaRepository<Study, Long> {
}
