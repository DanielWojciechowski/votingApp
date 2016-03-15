package votingApp.dataAccess.service;

import org.springframework.stereotype.Service;
import votingApp.dataAccess.pojo.Survey;

import java.util.List;

@Service
public interface SurveyService {

    List<Survey> listAll();

    Survey getById(Long id);

    Survey createNew(Survey survey);
}
