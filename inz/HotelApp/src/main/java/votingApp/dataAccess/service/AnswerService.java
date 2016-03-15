package votingApp.dataAccess.service;

import org.springframework.stereotype.Service;
import votingApp.dataAccess.pojo.Answer;

@Service
public interface AnswerService {
    Answer createNew(Answer answer);

    void vote(Long answerId);
}
