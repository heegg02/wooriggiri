package com.wooriggiri.app.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FavoriteRequestDTO {
    private Long userId;
    private Long boardId;
    private boolean isFavorite;
}
