package com.kh.reactbackend.repository;

import com.kh.reactbackend.entity.Member;
import jakarta.persistence.EntityManager;
import jdk.jfr.Percentage;
import org.springframework.stereotype.Repository;

@Repository
public class MemberRepositoryImpl implements MemberRepository {

    @Percentage
    private EntityManager em;

    @Override
    public void save(Member member) { em.persist(member);}
}
