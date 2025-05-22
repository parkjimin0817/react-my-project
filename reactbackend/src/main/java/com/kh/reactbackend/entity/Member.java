package com.kh.reactbackend.entity;

import com.kh.reactbackend.enums.CommonEnums;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED) //생성자의 접근제한자를 protected로 설정
@AllArgsConstructor
@Builder
public class Member {

    @Id
    @Column(name = "USER_ID", length = 20)
    private String userId;

    @Column(name = "USER_PWD", length = 20)
    private String userPwd;

    @Column(name = "USER_NAME", length = 10)
    private String userName;

    @Column(name = "EMAIL", length = 255)
    private String email;

    @Column(name = "ENROLL_DATE", updatable = false)
    private LocalDateTime enrollDate;

    @Column(name = "modify_date")
    private LocalDateTime modifyDate;

    @Column(length = 1, nullable = false)
    @Enumerated(EnumType.STRING)
    private CommonEnums.Status status;

    //1 : N 연관관계, 주인 : Goal
    @OneToMany(mappedBy = "member")
    List<Goal> goals = new ArrayList<>();

    //1 : N 연관관계, 주인 : board
    @OneToMany(mappedBy = "member")
    List<Post> boards = new ArrayList<>();

    //엔티티가 영속성 컨텍스트에 저장되기 전 (em.persist())에 실행되는 메서드
    //초기설정을 해두는 용도
    @PrePersist
    public void prePersist(){
        this.enrollDate = LocalDateTime.now();
        this.modifyDate = LocalDateTime.now();
        if(this.status == null) {
            this.status = CommonEnums.Status.Y;
        }
    }

    @PreUpdate
    public void preUpdate(){
        this.modifyDate = LocalDateTime.now();
    }
}
