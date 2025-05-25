package com.kh.reactbackend.service;

import com.kh.reactbackend.dto.GoalDto;
import com.kh.reactbackend.entity.Goal;
import com.kh.reactbackend.entity.Member;
import com.kh.reactbackend.repository.GoalRepository;
import com.kh.reactbackend.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class GoalServiceImpl implements GoalService {

    private final GoalRepository goalRepository;
    private final MemberRepository memberRepository;

    @Override
    public Long createGoal(GoalDto.Create createDto) {
        Member member = memberRepository.findByUserId(createDto.getUser_id())
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));
        //DTO -> Entity 변환
        Goal goal = createDto.toEntity(member);
        return goalRepository.save(goal);
    }

    @Override
    public List<GoalDto.Response> getGoalsByUserId(String userId) {
        Member member = memberRepository.findByUserId(userId)
                .orElseThrow(() ->  new IllegalArgumentException("사용자를 찾을 수 없습니다."));

        return goalRepository.findByUserId(member.getUserId()).stream()
                .map(GoalDto.Response::toDto)
                .collect(Collectors.toList());
    }

    public void deleteGoal(Long goalNo) {
        Goal goal = goalRepository.findByGoalNo(goalNo)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 목표입니다"));
        goalRepository.delete(goal);
    }

    @Override
    public GoalDto.Response getGoalDetail(Long goalNo) {
        Goal goal = goalRepository.findByGoalNo(goalNo)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 목표입니다."));
        return GoalDto.Response.toDto(goal);
    }
}
