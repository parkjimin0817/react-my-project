package com.kh.reactbackend.controller;

import com.kh.reactbackend.dto.MemberDto;
import com.kh.reactbackend.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:5175")
@RestController
@RequestMapping("/api/members")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    //회원 등록
    @PostMapping
    public ResponseEntity<String> addMember(@RequestBody MemberDto.Create createDto){
        String userId = memberService.createMember(createDto);
        return ResponseEntity.ok(userId);
    }

    //회원 로그인
    @PostMapping("/login")
    public ResponseEntity<MemberDto.Response> login(@RequestBody MemberDto.Login loginDto){
        MemberDto.Response member = memberService.login(loginDto);
        return ResponseEntity.ok(member);
    }

}
