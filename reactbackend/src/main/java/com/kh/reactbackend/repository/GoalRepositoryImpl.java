package com.kh.reactbackend.repository;

import com.kh.reactbackend.entity.Goal;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;

@Repository
public class GoalRepositoryImpl implements GoalRepository {

    @PersistenceContext
    private EntityManager em;

    @Override
    public Long save(Goal goal) {
        em.persist(goal);
        return goal.getGoalNo();
    }
}
