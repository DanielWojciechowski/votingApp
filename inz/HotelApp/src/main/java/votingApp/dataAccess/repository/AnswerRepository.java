package votingApp.dataAccess.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import votingApp.dataAccess.pojo.Answer;

@Repository
public interface AnswerRepository extends JpaRepository<Answer, Long> {

}
