package com.wooriggiri.app.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BoardListDTO {
    private Long id;
    private String boardname;
    private String username;
    private Long totalPostsCount;
    private Long totalViewCount;
}
