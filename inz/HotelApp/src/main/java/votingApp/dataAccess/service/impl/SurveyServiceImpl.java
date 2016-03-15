package votingApp.dataAccess.service.impl;

import org.springframework.stereotype.Service;
import votingApp.dataAccess.pojo.Answer;
import votingApp.dataAccess.pojo.Survey;
import votingApp.dataAccess.repository.SurveyRepository;
import votingApp.dataAccess.service.SurveyService;

import javax.inject.Inject;
import javax.transaction.Transactional;
import java.util.Collections;
import java.util.List;

@Service
public class SurveyServiceImpl implements SurveyService {

    private final SurveyRepository repository;

    @Inject
    public SurveyServiceImpl(SurveyRepository repository) {
        this.repository = repository;
    }

    @Override
    public List<Survey> listAll() {
        List<Survey> all = repository.findAll();
        for (Survey survey : all){
            sortAndCalculatePercent(survey);
        }
        return all;
    }

    private void sortAndCalculatePercent(Survey survey) {
        Collections.sort(survey.getAnswers());
        int sumOfVotes = survey.calculateSumOfVotes();
        if (sumOfVotes != 0) {
            for (Answer answer : survey.getAnswers()) {
                answer.setPercent((answer.getNumberOfVotes()*100)/sumOfVotes);
            }
        }
    }

    @Override
    public Survey getById(Long id) {
        Survey survey = repository.getOne(id);
        System.out.println( "Survey with id:"+id + (survey != null ? " found" : " not found"));
        sortAndCalculatePercent(survey);
        return survey;
    }

    @Transactional
    @Override
    public Survey createNew(Survey survey) {
        Survey newSurvey = repository.save(survey);
        System.out.println("New Survey created with id=" + newSurvey.getId());
        return newSurvey;
    }
}
