package com.wooriggiri.app.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChildCommentRequestDTO {
    private Long userId;
    private Long postId;
    private Long parentCommentId;
    private String comment;

}
