package com.kh.reactbackend.repository;

import com.kh.reactbackend.entity.Goal;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class GoalRepositoryImpl implements GoalRepository {

    @PersistenceContext
    private EntityManager em;

    @Override
    public Long save(Goal goal) {
        em.persist(goal);
        return goal.getGoalNo();
    }

    @Override
    public List<Goal> findByUserId(String userId) {
        String query = "select g from Goal g where g.member.userId = :userId";

        return em.createQuery(query, Goal.class)
                .setParameter("userId", userId)
                .getResultList();
    }

    @Override
    public Optional<Goal> findByGoalNo(Long goalNo) {
        if(goalNo == null) return Optional.empty();
        return Optional.ofNullable(em.find(Goal.class, goalNo));
    }

    @Override
    public void delete(Goal goal) {
        em.remove(goal);
    }
}
