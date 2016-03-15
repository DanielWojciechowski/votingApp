package votingApp.dataAccess.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import votingApp.dataAccess.pojo.Survey;

@Repository
public interface SurveyRepository extends JpaRepository<Survey, Long> {

}
