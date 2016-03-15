package votingApp.dataAccess.pojo;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.google.common.base.Strings;
import lombok.Data;

import javax.persistence.*;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.LinkedList;
import java.util.List;

@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Entity
@Data
public class Survey {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String question;
    private Boolean isClosed=false;

    private Date endDate;

    @OneToMany(mappedBy="survey", fetch=FetchType.EAGER)
    @JsonManagedReference
    private List<Answer> answers = new LinkedList<>();

    public Survey() {
    }

    public Survey(String question, String endDate, String[] answers) {
        this.question = question;
        if (! Strings.isNullOrEmpty(endDate)) {
            DateFormat df = new SimpleDateFormat("yyyy-MM-dd-HH-mm");
            try {
                this.endDate = df.parse(endDate);
            } catch (ParseException e) {
                e.printStackTrace();
            }
        }
        for (String answerString : answers) {
            Answer answer = new Answer(answerString);
            answer.setSurvey(this);
            this.answers.add(answer);
        }
    }

    public int calculateSumOfVotes() {
        return this.answers.stream().map(Answer::getNumberOfVotes).reduce(0, (x, y) -> x + y);
    }
}
