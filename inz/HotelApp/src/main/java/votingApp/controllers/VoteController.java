package votingApp.controllers;

import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import votingApp.dataAccess.pojo.Survey;
import votingApp.dataAccess.pojo.User;
import votingApp.dataAccess.service.AnswerService;
import votingApp.dataAccess.service.SurveyService;
import votingApp.dataAccess.service.UserService;

import javax.inject.Inject;
import java.util.Arrays;
import java.util.Date;
import java.util.Iterator;
import java.util.List;

@Controller
@EnableScheduling
public class VoteController {

    private final UserService userService;
    private final SurveyService surveyService;
    private final AnswerService answerService;

    @Inject
    public VoteController(UserService userService, SurveyService surveyService, AnswerService answerService) {
        this.userService = userService;
        this.surveyService = surveyService;
        this.answerService = answerService;
    }

    @RequestMapping("/votingApp")
    public String votingApp() {
        return "index";
    }

    @RequestMapping(value = "/users/findByPhoneNumber", method = RequestMethod.GET)
    public @ResponseBody
    User findUserByPhoneNumber(@RequestParam("phoneNumber") String number) {
        return this.userService.findByPhoneNumber(number);
    }

    @RequestMapping(value = "/users/registerNew", method = RequestMethod.POST)
    public @ResponseBody
    User registerNewUser(@RequestParam("phoneNumber") String number, @RequestParam("name") String name) {
        return this.userService.registerNew(new User(name, number));
    }

    @RequestMapping(value = "/surveys", method = RequestMethod.GET)
    public @ResponseBody
    List<Survey> getAllSurveys() {
        return this.surveyService.listAll();
    }

    @RequestMapping(value = "/survey", method = RequestMethod.GET)
    public @ResponseBody
    Survey getSurvey(@RequestParam("id") Long id) {
        return surveyService.getById(id);
    }

    @RequestMapping(value = "/currentSurveys", method = RequestMethod.GET)
    public @ResponseBody
    List<Survey> getCurrentSurveys() {
        List<Survey> surveys = surveyService.listAll();
        Iterator<Survey> iterator = surveys.iterator();
        while (iterator.hasNext()) {
            Survey survey = iterator.next();
            if (survey.getIsClosed()) {
                iterator.remove();
            }
        }
        return surveys;
    }

    @RequestMapping(value = "/closedSurveys", method = RequestMethod.GET)
    public @ResponseBody
    List<Survey> getClosedSurveys() {
        List<Survey> surveys = surveyService.listAll();
        Iterator<Survey> iterator = surveys.iterator();
        while (iterator.hasNext()) {
            Survey survey = iterator.next();
            if (!survey.getIsClosed()) {
                iterator.remove();
            }
        }
        return surveys;
    }

    @RequestMapping(value = "/surveys/add", method = RequestMethod.POST)
    public @ResponseBody
    Survey createNewSurvey(@RequestParam("question") String question, @RequestParam("endDate") String endDate, @RequestParam("answers") String[] answers) {
        System.out.println("req:"+question+ ", "+endDate+", "+ Arrays.toString(answers));
        Survey survey = this.surveyService.createNew(new Survey(question, endDate, answers));
        survey.getAnswers().forEach(this.answerService::createNew);
        GCMSender.send("survey " + survey.getId());
        return survey;
    }

    @RequestMapping(value = "/vote", method = RequestMethod.POST)
    public @ResponseBody
    void vote(@RequestParam("answerId") Long answerId) {
        answerService.vote(answerId);
    }

    @RequestMapping(value = "/send", method = RequestMethod.GET)
    public @ResponseBody
    void send(@RequestParam("message") String message) {
        GCMSender.send(message);
    }


    @Scheduled(fixedRate = 60000)
    public void scheduleFixedDelayTask() {
        for (Survey survey : surveyService.listAll()) {
            boolean everyoneVoted = survey.getEndDate() == null && survey.calculateSumOfVotes() >= userService.listAll().size();
            boolean timeIsOver = survey.getEndDate() != null && survey.getEndDate().before(new Date());
            if (! survey.getIsClosed() && (everyoneVoted || timeIsOver)){
                survey.setIsClosed(true);
                surveyService.createNew(survey);
                Long surveyId = survey.getId();
                System.out.println("Survey closed, id:"+ surveyId);
                GCMSender.send("result " + surveyId);
            }
        }
    }
}
