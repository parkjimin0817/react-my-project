package com.kh.reactbackend.entity;

import com.kh.reactbackend.enums.CommonEnums;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.Date;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class Goal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "GOAL_NO")
    private Long goalNo;

    @Column(name = "GOAL_TITLE", length = 50, nullable = false)
    private String goalTitle;

    @Column(name = "GOAL_CONTENT", nullable = false)
    @Lob
    private String goalContent;

    @Column(name = "START_DATE", nullable = false)
    //날짜만 저장하면 돼서 LocalDate
    private LocalDate startDate;

    @Column(name = "FREQUENCY", nullable = false)
    @Enumerated(EnumType.STRING)
    private CommonEnums.Frequency frequency;

    //Goal : Member (N : 1)
    @ManyToOne(fetch = FetchType.LAZY) //불필요한 연관 데이터 조회 방지
    @JoinColumn(name = "GOAL_WRITER")
    private Member member;

}
