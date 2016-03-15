package votingApp.dataAccess.service.impl;

import org.springframework.stereotype.Service;
import votingApp.dataAccess.pojo.Answer;
import votingApp.dataAccess.repository.AnswerRepository;
import votingApp.dataAccess.service.AnswerService;

import javax.inject.Inject;
import javax.transaction.Transactional;

@Service
public class AnswerServiceImpl implements AnswerService {

    private final AnswerRepository repository;

    @Inject
    public AnswerServiceImpl(AnswerRepository repository) {
        this.repository = repository;
    }

    @Transactional
    @Override
    public Answer createNew(Answer answer) {
        Answer newAnswer = repository.save(answer);
        System.out.println("New Answer created with id=" + newAnswer.getId());
        return newAnswer;
    }

    @Override
    public void vote(Long answerId) {
        Answer answer = repository.getOne(answerId);
        if (! answer.getSurvey().getIsClosed()) {
            answer.setNumberOfVotes(answer.getNumberOfVotes() + 1);
            repository.save(answer);
            System.out.println("Vote for:"+answerId);
        } else {
            System.out.println("Survey closed. Cant vote for:"+answerId);
        }
    }
}
