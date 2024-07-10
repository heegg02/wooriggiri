package com.wooriggiri.app.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PostRequestDTO {
    private Long boardId;
    private Long userId;
    private String title;
    private String content;
}
