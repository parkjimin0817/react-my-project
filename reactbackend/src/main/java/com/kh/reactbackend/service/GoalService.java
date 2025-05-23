package com.kh.reactbackend.service;

import com.kh.reactbackend.dto.GoalDto;
import com.kh.reactbackend.entity.Member;

public interface GoalService {
    Long createGoal(GoalDto.Create createDto);
}
