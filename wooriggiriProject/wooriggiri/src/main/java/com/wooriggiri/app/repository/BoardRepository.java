package com.wooriggiri.app.repository;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.wooriggiri.app.domain.BoardListDTO;
import com.wooriggiri.app.entity.Board;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface BoardRepository extends JpaRepository<Board, Long> {
    
    Board findByBoardname(String boardname);

    @Query("SELECT new com.wooriggiri.app.domain.BoardListDTO(b.id, b.boardname, u.username, COUNT(p.id) AS totalPostsCount, SUM(p.viewCount) AS totalViewCount) " + 
           "FROM Board b " + 
           "JOIN Post p ON b.id = p.boardId " + 
           "JOIN User u ON u.id = b.userId " +
           "WHERE p.createdDate >= :oneWeekAgo " + 
           "GROUP BY p.boardId " +
           "ORDER BY totalViewCount DESC")
    List<BoardListDTO> findPopularCommunities(LocalDateTime oneWeekAgo, Pageable pageable);

    @Query("SELECT b.boardname FROM Board b WHERE b.userId = :userId")
    List<String> findbyUserId(int userId);

    @Query("SELECT b.boardname FROM Board b JOIN BoardFavorite f ON b.id = f.boardId WHERE f.follower = :userId")
    List<String> findFavoritesByUserID(int userId); 

    @Query("SELECT b.boardname FROM Board b WHERE b.boardname LIKE %:keyword%")
    List<String> findCommunitiesByKeyword(String keyword);
}
