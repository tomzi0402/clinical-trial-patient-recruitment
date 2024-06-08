package qmul.cecm.ctpr.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import qmul.cecm.ctpr.api.model.Status;

@Repository
public interface StatusRepository extends JpaRepository<Status, Long> {
}
