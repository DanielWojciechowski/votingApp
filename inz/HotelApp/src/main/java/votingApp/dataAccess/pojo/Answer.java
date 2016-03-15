package votingApp.dataAccess.pojo;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import javax.persistence.*;

@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Entity
@Data
public class Answer implements Comparable<Answer>{

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String answer;
    private int numberOfVotes;

    @Transient
    private int percent;

    @ManyToOne(cascade=CascadeType.ALL, fetch=FetchType.EAGER)
    @JoinColumn(name="surveyId")
    @JsonBackReference
    private Survey survey;

    public Answer() {
    }

    public Answer(String answerString) {
        this.answer = answerString;
    }

    @Override
    public int compareTo(Answer answer) {
        if (this.numberOfVotes == answer.getNumberOfVotes()) return 0;
        if (this.numberOfVotes > answer.getNumberOfVotes()) return -1;
        else return 1;
    }
}
