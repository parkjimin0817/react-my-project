package com.kh.reactbackend.service;

import com.kh.reactbackend.dto.GoalDto;
import com.kh.reactbackend.entity.Member;

import java.util.List;

public interface GoalService {
    Long createGoal(GoalDto.Create createDto);
    List<GoalDto.Response> getGoalsByUserId(String userId);
}
