package com.kh.reactbackend.controller;

import com.kh.reactbackend.dto.GoalDto;
import com.kh.reactbackend.entity.Goal;
import com.kh.reactbackend.entity.Member;
import com.kh.reactbackend.repository.MemberRepository;
import com.kh.reactbackend.service.GoalService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/goals")
@RequiredArgsConstructor
public class GoalController {

    private final GoalService goalService;
    private final MemberRepository memberRepository;

    //목표 작성
    @PostMapping
    public ResponseEntity<Long> createGoal(@RequestBody GoalDto.Create createDto) {
        return ResponseEntity.ok(goalService.createGoal(createDto));
    }

    //회원 목표 조회
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<GoalDto.Response>> getGoals(@PathVariable String userId){
        return ResponseEntity.ok(goalService.getGoalsByUserId(userId));
    }

    //목표 상세 조회
    @GetMapping("/{goalNo}")
    public ResponseEntity<GoalDto.Response> getGoal(@PathVariable Long goalNo){
        return ResponseEntity.ok(goalService.getGoalDetail(goalNo));
    }

    //회원 목표 삭제
    @DeleteMapping("/{goalNo}")
    public ResponseEntity<Void> deleteGoal(@PathVariable Long goalNo){
        goalService.deleteGoal(goalNo);
        return ResponseEntity.ok().build();
    }

    //회원 목표 수정
    @PatchMapping("/{goalNo}")
    public ResponseEntity<GoalDto.Response> updateGoal(@PathVariable Long goalNo, @RequestBody GoalDto.Update updateDto){
        return ResponseEntity.ok(goalService.updateGoal(goalNo, updateDto));
    }
}
