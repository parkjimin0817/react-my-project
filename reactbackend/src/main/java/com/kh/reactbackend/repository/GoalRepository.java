package com.kh.reactbackend.repository;

import com.kh.reactbackend.entity.Goal;

import java.util.List;
import java.util.Optional;

public interface GoalRepository {
    Long save(Goal goal);
    List<Goal> findByUserId(String userId);
    Optional<Goal> findByGoalNo (Long goalNo);
    void delete(Goal goal);
}
