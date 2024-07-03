package com.wooriggiri.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.wooriggiri.app.entity.BoardFavorite;

public interface BoardFavoriteRepository extends JpaRepository<BoardFavorite, Long> {

    int countByBoardId(Long boardId);
}
