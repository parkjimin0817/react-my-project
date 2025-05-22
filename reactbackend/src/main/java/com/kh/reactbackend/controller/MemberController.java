package com.kh.reactbackend.controller;

import com.kh.reactbackend.dto.MemberDto;
import com.kh.reactbackend.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
