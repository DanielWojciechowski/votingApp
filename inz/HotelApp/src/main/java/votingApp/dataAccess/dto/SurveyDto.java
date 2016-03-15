package votingApp.dataAccess.dto;

import lombok.Data;

@Data
public class SurveyDto {
    private String question;
    private String endDate;
    private String[] answers;
}
