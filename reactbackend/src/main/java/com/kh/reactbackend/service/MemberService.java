package com.kh.reactbackend.service;

import com.kh.reactbackend.dto.MemberDto;

public interface MemberService {
    String createMember(MemberDto.Create createDto);
}
