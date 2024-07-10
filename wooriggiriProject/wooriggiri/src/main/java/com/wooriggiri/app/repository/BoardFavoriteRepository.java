package com.wooriggiri.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import com.wooriggiri.app.entity.BoardFavorite;

public interface BoardFavoriteRepository extends JpaRepository<BoardFavorite, Long> {

    int countByBoardId(Long boardId);

    @Query("SELECT bf FROM BoardFavorite bf WHERE bf.follower = :userId AND bf.boardId = :boardId")
    BoardFavorite findFavorite(Long userId, Long boardId);
    
    @Transactional
    @Modifying
    @Query("DELETE FROM BoardFavorite bf WHERE bf.follower = :userId AND bf.boardId = :boardId")
    void deleteBoardFavorite(Long userId, Long boardId);
}
