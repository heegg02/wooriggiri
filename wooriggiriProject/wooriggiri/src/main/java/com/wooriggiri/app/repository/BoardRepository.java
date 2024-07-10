package com.wooriggiri.app.repository;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

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
           "WHERE p.createdDate >= :oneWeekAgo AND b.boardType = 1 " + 
           "GROUP BY p.boardId " +
           "ORDER BY totalViewCount DESC")
    List<BoardListDTO> findPopularCommunities(LocalDateTime oneWeekAgo, Pageable pageable);

    @Query("SELECT b.boardname FROM Board b WHERE b.userId = :userId AND b.boardType = 1")
    List<String> findbyUserId(int userId);

    @Query("SELECT b.boardname FROM Board b JOIN BoardFavorite f ON b.id = f.boardId WHERE f.follower = :userId AND b.boardType = 1 ")
    List<String> findFavoritesByUserID(int userId); 

    @Query("SELECT b.boardname FROM Board b WHERE b.boardname LIKE %:keyword% AND b.boardType = 1")
    List<String> findCommunitiesByKeyword(String keyword);

    @Query("SELECT new com.wooriggiri.app.domain.MyBoardDTO(b.id, b.boardType, b.boardname, u.username, b.description, b.createdDate) " +
            "FROM Board b " +
            "JOIN User u ON b.userId = u.id " + 
            "WHERE b.userId = :userId AND b.boardType IN (1,2) " +
            "ORDER BY b.createdDate ASC")
    List<?> findByUserId(Long userId);

    @Query("SELECT new com.wooriggiri.app.domain.MyBoardDTO(b.id, b.boardType, b.boardname, u.username, b.description, f.createdDate) " +
       "FROM Board b " +
       "JOIN User u ON b.userId = u.id " +
       "JOIN BoardFavorite f ON b.id = f.boardId " +
       "WHERE f.follower = :userId AND b.boardType = 1 " +
       "ORDER BY b.createdDate ASC")
    List<?> findByFavorite(Long userId);

    @Modifying
    @Transactional
    @Query("UPDATE Board b SET b.boardType = :boardType WHERE b.id = :boardId")
    void updateBoardTypeById(Long boardId, int boardType);

    @Query("SELECT new com.wooriggiri.app.domain.MyBoardDTO(b.id, b.boardType, b.boardname, u.username, b.description, b.createdDate) " +
           "FROM Board b " +
           "JOIN User u ON b.userId = u.id " +
           "WHERE (:id IS NULL OR b.id = :id) AND (:username = '' OR u.username LIKE %:username%) AND (:boardname = '' OR b.boardname LIKE %:boardname%) AND b.boardType = 1 " +
           "ORDER BY b.createdDate DESC")
    List<?> findBoard(Long id, String username, String boardname, Pageable pageable);

    @Query("SELECT COUNT(b.id) " +
           "FROM Board b " +
           "JOIN User u ON b.userId = u.id " +
           "WHERE (:id IS NULL OR b.id = :id) AND (:username = '' OR u.username LIKE %:username%) AND (:boardname = '' OR b.boardname LIKE %:boardname%) AND b.boardType = 1")
    int countBoardALL(Long id, String username, String boardname);

}
