package com.kh.reactbackend.controller;

import com.kh.reactbackend.dto.GoalDto;
import com.kh.reactbackend.entity.Goal;
import com.kh.reactbackend.entity.Member;
import com.kh.reactbackend.repository.MemberRepository;
import com.kh.reactbackend.service.GoalService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin (origins = "http://localhost:5175")
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
    @GetMapping("/{userId}")
    public ResponseEntity<List<GoalDto.Response>> getGoalsByUserId(@PathVariable String userId){
        System.out.println(goalService.getGoalsByUserId(userId));
        return ResponseEntity.ok(goalService.getGoalsByUserId(userId));
    }
}
