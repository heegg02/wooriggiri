package com.wooriggiri.app.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.wooriggiri.app.domain.BoardItemDTO;
import com.wooriggiri.app.domain.PostDetailDTO;
import com.wooriggiri.app.entity.Post;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {

       int countByBoardId(Long boardId);

       int countByUserId(Long userId);

       @Transactional
       @Modifying
       @Query("UPDATE Post p SET p.viewCount = p.viewCount + 1 WHERE p.id = :postId")
       int incrementViewCount(int postId);

       @Query("SELECT new com.wooriggiri.app.domain.PostDetailDTO(p.id, p.title, u.username, p.content p,viewCount, p.createdDate, p.updatedDate) " +
       "FROM Post p " +
       "JOIN User u ON p.userId = u.id " +
       "WHERE p.id = :postId ")
       List<PostDetailDTO> findByPostId(int postId);

       @Query("SELECT new com.wooriggiri.app.domain.BoardItemDTO(p.id, b.boardname, u.username, p.title, p.viewCount, p.createdDate, p.updatedDate) " +
       "FROM Post p " +
       "JOIN Board b ON p.boardId = b.id " +
       "JOIN User u ON p.userId = u.id " +
       "WHERE p.postType = 1 AND b.boardname = :boardname " +
       "ORDER BY p.createdDate DESC")
       List<BoardItemDTO> findByBoardname(String boardname, Pageable pageable);

       @Query("SELECT new com.wooriggiri.app.domain.BoardItemDTO(p.id, b.boardname, u.username, p.title, p.viewCount, p.createdDate, p.updatedDate) " +
       "FROM Post p " +
       "JOIN Board b ON p.boardId = b.id " +
       "JOIN User u ON p.userId = u.id " +
       "WHERE p.postType = 0 " +
       "ORDER BY p.createdDate DESC")
       List<BoardItemDTO> findNoticePosts(Pageable pageable);

    @Query("SELECT new com.wooriggiri.app.domain.BoardItemDTO(p.id, b.boardname, u.username, p.title, p.viewCount, p.createdDate, p.updatedDate) " +
           "FROM Post p " +
           "JOIN Board b ON p.boardId = b.id " +
           "JOIN User u ON p.userId = u.id " +
           "WHERE p.postType = 1 AND p.createdDate >= :oneWeekAgo " +
           "ORDER BY p.viewCount DESC ")
    List<BoardItemDTO> findPopularPosts(LocalDateTime oneWeekAgo, Pageable pageable);

    @Query("SELECT new com.wooriggiri.app.domain.BoardItemDTO(p.id, b.boardname, u.username, p.title, p.viewCount, p.createdDate, p.updatedDate) " +
           "FROM Post p " +
           "JOIN Board b ON p.boardId = b.id " +
           "JOIN User u ON p.userId = u.id " +
           "WHERE p.postType = 1 AND b.userId = :userId " +
           "ORDER BY p.createdDate DESC ")
    List<BoardItemDTO> findMyCommunitiesPosts(@Param("userId") int userId, Pageable pageable);

    @Query("SELECT new com.wooriggiri.app.domain.BoardItemDTO(p.id, b.boardname, u.username, p.title, p.viewCount, p.createdDate, p.updatedDate) " +
           "FROM Post p " +
           "JOIN Board b ON p.boardId = b.id " +
           "JOIN User u ON p.userId = u.id " +
           "JOIN BoardFavorite f ON b.id = f.boardId " +
           "WHERE p.postType = 1 AND f.follower = :userId " +
           "ORDER BY p.createdDate DESC ")
    List<BoardItemDTO> findFavoriteCommunityPosts(@Param("userId") int userId, Pageable pageable);
}