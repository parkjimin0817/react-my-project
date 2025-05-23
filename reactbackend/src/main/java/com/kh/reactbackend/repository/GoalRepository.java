package com.kh.reactbackend.repository;

import com.kh.reactbackend.entity.Goal;

import java.util.List;

public interface GoalRepository {
    Long save(Goal goal);
    List<Goal> findByUserId(String userId);
}
