package com.wooriggiri.app.domain;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PostDTO {
    private Long postId;
    private int postType;
    private String boardname;
    private String username;
    private String title;
    private int viewCount;
    private LocalDateTime createdDate;
}
