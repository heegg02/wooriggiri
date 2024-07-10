package com.wooriggiri.app.domain;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CommentDTO {
    private Long commentId;
    private Long postId;
    private int commentType;
    private String boardname;
    private String username;
    private String content;
    private Long parentCommentId;
    private LocalDateTime createdDate;
    private LocalDateTime updatedDate;
}
