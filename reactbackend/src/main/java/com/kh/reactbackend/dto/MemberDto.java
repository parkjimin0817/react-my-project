package com.kh.reactbackend.dto;

import com.kh.reactbackend.entity.Member;
import lombok.*;

public class MemberDto {

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Create {
        private String user_id;
        private String user_pwd;
        private String user_name;
        private String email;

        public Member toEntity(){
            return Member.builder()
                    .userId(this.user_id)
                    .userPwd(this.user_pwd)
                    .userName(this.user_name)
                    .email(this.email)
                    .build();
        }
    }

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Login {
        private String user_id;
        private String user_pwd;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Response{
        private String user_id;
        private String user_pwd;
        private String user_name;
        private String email;

        public static Response toDto(Member member){
            return Response.builder()
                    .user_id(member.getUserId())
                    .user_pwd(member.getUserPwd())
                    .user_name(member.getUserName())
                    .email(member.getEmail())
                    .build();
        }
    }
}
