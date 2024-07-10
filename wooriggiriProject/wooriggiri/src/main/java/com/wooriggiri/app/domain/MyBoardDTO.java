package com.wooriggiri.app.domain;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MyBoardDTO {
    private Long boardId;
    private int boardType;
    private String boardname;
    private String username;
    private String description;
    private LocalDateTime createdDate;
}
