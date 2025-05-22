package com.kh.reactbackend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "POST_NO")
    private Long postNo;

    @Column(name = "POST_TITLE", length = 100, nullable = false)
    private String postTitle;

    @Column(name = "POST_CONTENT", nullable = false)
    @Lob
    private String postContent;

    @Column(name = "IMG_URL")
    private String imgUrl;

    @Column(name = "CREATE_DATE")
    private LocalDateTime createDate;

    //Post : Member (N : 1)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "POST_WRITER")
    private Member member;

    @PrePersist
    protected void onCreate() {
        this.createDate = LocalDateTime.now();
    }

}
