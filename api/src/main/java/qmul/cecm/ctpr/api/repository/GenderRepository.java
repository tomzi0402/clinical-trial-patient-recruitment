package qmul.cecm.ctpr.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import qmul.cecm.ctpr.api.model.Gender;

@Repository
public interface GenderRepository extends JpaRepository<Gender, Long> {
}
