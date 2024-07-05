package com.wooriggiri.app.domain;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PostDetailDTO {
    private Long postId;
    private String title;
    private String username;
    private String content;
    private int viewCount;
    private LocalDateTime createdDate;
    private LocalDateTime updatedDate;
}
