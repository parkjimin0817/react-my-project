package com.kh.reactbackend.service;

import com.kh.reactbackend.dto.MemberDto;
import com.kh.reactbackend.entity.Member;
import com.kh.reactbackend.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;

    @Override
    public String createMember(MemberDto.Create createDto) {
        Member member = createDto.toEntity(); // entity로 db에 넘겨주기
        memberRepository.save(member); // 영속 상태
        return member.getUserId();
    }

    @Override
    public MemberDto.Response login(MemberDto.Login loginDto) {
        Member member = memberRepository.findByUserId(loginDto.getUser_id())
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 아이디입니다."));
        return MemberDto.Response.toDto(member);
    }
}
