package com.kh.reactbackend.dto;

import com.kh.reactbackend.entity.Goal;
import com.kh.reactbackend.entity.Member;
import com.kh.reactbackend.enums.CommonEnums;
import lombok.*;

import java.time.LocalDate;

public class GoalDto {

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Create {
        private String goal_title;
        private String goal_content;
        private LocalDate start_date;
        private CommonEnums.Frequency frequency;
        private String user_id;

        public Goal toEntity(Member member){
            return Goal.builder()
                    .goalTitle(this.goal_title)
                    .goalContent(this.goal_content)
                    .startDate(this.start_date)
                    .frequency(this.frequency)
                    .member(member)
                    .build();
        }
    }

    public static class Update {
        private 
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Response {
        private Long goal_no;
        private String goal_title;
        private String goal_content;
        private LocalDate start_date;
        private CommonEnums.Frequency frequency;
        private String user_id;

        public static Response toDto(Goal goal){
            return Response.builder()
                    .goal_no(goal.getGoalNo())
                    .goal_title(goal.getGoalTitle())
                    .goal_content(goal.getGoalContent())
                    .start_date(goal.getStartDate())
                    .frequency(goal.getFrequency())
                    .user_id(goal.getMember().getUserId())
                    .build();
        }
    }
}
