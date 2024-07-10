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

    @Query("SELECT new com.wooriggiri.app.domain.BoardItemDTO(p.id, b.boardType, b.boardname, u.username, p.title, p.viewCount, p.createdDate, p.updatedDate) " +
    "FROM Post p " +
    "JOIN Board b ON p.boardId = b.id " +
    "JOIN User u ON p.userId = u.id " +
    "WHERE p.postType = 1 AND b.boardname = :boardname AND " +
    "(:title = '' OR p.title LIKE %:title%) AND (:username = '' OR u.username LIKE %:username%) " +
    "ORDER BY p.createdDate DESC")
    List<BoardItemDTO> findByBoardname(String boardname, Pageable pageable, String title, String username);

    @Query("SELECT COUNT(p.id) " +
    "FROM Post p " +
    "JOIN Board b ON p.boardId = b.id " +
    "JOIN User u ON p.userId = u.id " +
    "WHERE p.postType = 1 AND b.boardname = :boardname AND " +
    "(:title = '' OR p.title LIKE %:title%) AND (:username = '' OR u.username LIKE %:username%) " +
    "ORDER BY p.createdDate DESC")
    int countByBoardnameALL(String boardname, String title, String username);

    @Query("SELECT new com.wooriggiri.app.domain.BoardItemDTO(p.id, b.boardType, b.boardname, u.username, p.title, p.viewCount, p.createdDate, p.updatedDate) " +
    "FROM Post p " +
    "JOIN Board b ON p.boardId = b.id " +
    "JOIN User u ON p.userId = u.id " +
    "WHERE p.postType = 0 " +
    "ORDER BY p.createdDate DESC")
    List<BoardItemDTO> findNoticePosts(Pageable pageable);

    @Query("SELECT new com.wooriggiri.app.domain.BoardItemDTO(p.id, b.boardType, b.boardname, u.username, p.title, p.viewCount, p.createdDate, p.updatedDate) " +
           "FROM Post p " +
           "JOIN Board b ON p.boardId = b.id " +
           "JOIN User u ON p.userId = u.id " +
           "WHERE p.postType = 1 AND p.createdDate >= :oneWeekAgo AND b.boardType = 1 " +
           "ORDER BY p.viewCount DESC ")
    List<BoardItemDTO> findPopularPosts(LocalDateTime oneWeekAgo, Pageable pageable);

    @Query("SELECT new com.wooriggiri.app.domain.BoardItemDTO(p.id, b.boardType, b.boardname, u.username, p.title, p.viewCount, p.createdDate, p.updatedDate) " +
           "FROM Post p " +
           "JOIN Board b ON p.boardId = b.id " +
           "JOIN User u ON p.userId = u.id " +
           "WHERE p.postType = 1 AND b.userId = :userId AND b.boardType = 1 " +
           "ORDER BY p.createdDate DESC ")
    List<BoardItemDTO> findMyCommunitiesPosts(@Param("userId") int userId, Pageable pageable);

    @Query("SELECT new com.wooriggiri.app.domain.BoardItemDTO(p.id, b.boardType, b.boardname, u.username, p.title, p.viewCount, p.createdDate, p.updatedDate) " +
           "FROM Post p " +
           "JOIN Board b ON p.boardId = b.id " +
           "JOIN User u ON p.userId = u.id " +
           "JOIN BoardFavorite f ON b.id = f.boardId " +
           "WHERE p.postType = 1 AND f.follower = :userId AND b.boardType = 1 " +
           "ORDER BY p.createdDate DESC ")
    List<BoardItemDTO> findFavoriteCommunityPosts(@Param("userId") int userId, Pageable pageable);

    @Query("SELECT new com.wooriggiri.app.domain.BoardItemDTO(p.id, b.boardType, b.boardname, u.username, p.title, p.viewCount, p.createdDate, p.updatedDate) " +
           "FROM Post p " +
           "JOIN Board b ON p.boardId = b.id " +
           "JOIN User u ON p.userId = u.id " +
           "WHERE p.postType IN (1, 2) AND p.userId = :userId AND b.boardType = 1 " +
           "ORDER BY p.createdDate DESC ")
    List<?> findByUserId(Long userId);

    @Query("SELECT new com.wooriggiri.app.domain.PostDTO(p.id, p.postType, b.boardname, u.username, p.title, p.viewCount, p.createdDate) " +
           "FROM Post p " +
           "JOIN Board b ON p.boardId = b.id " +
           "JOIN User u ON p.userId = u.id " +
           "WHERE (:id IS NULL OR p.id = :id) AND (:username = '' OR u.username LIKE %:username%) AND (:boardname = '' OR b.boardname LIKE %:boardname%) AND (:title = '' OR p.title LIKE %:title%) AND p.postType = 1 AND b.boardType = 1 " +
           "ORDER BY p.createdDate DESC ")
    List<?> findPost(Long id, String title, String username, String boardname, Pageable pageable);
    
    @Query("SELECT COUNT(p.id) " +
           "FROM Post p " +
           "JOIN Board b ON p.boardId = b.id " +
           "JOIN User u ON p.userId = u.id " +
           "WHERE (:id IS NULL OR p.id = :id) AND (:username = '' OR u.username LIKE %:username%) AND (:boardname = '' OR b.boardname LIKE %:boardname%) AND (:title = '' OR p.title LIKE %:title%) AND p.postType = 1 AND b.boardType = 1 ")
    int countPostALL(Long id, String title, String username, String boardname);

    @Modifying
    @Transactional
    @Query("UPDATE Post p SET p.postType = :postType WHERE p.id = :postId")
    void updatePostTypeById(Long postId, int postType);

    @Query("SELECT new com.wooriggiri.app.domain.BoardItemDTO(p.id, b.boardType, b.boardname, u.username, p.title, p.viewCount, p.createdDate, p.updatedDate) " +
           "FROM Post p " +
           "JOIN Board b ON p.boardId = b.id " +
           "JOIN User u ON p.userId = u.id " +
           "WHERE (:username = '' OR u.username LIKE %:username%) AND (:title = '' OR p.title LIKE %:title%) AND p.postType = 0 AND b.boardType = 0 " +
           "ORDER BY p.createdDate DESC ")
    List<?> findNoties(Pageable pageable, String title, String username);

    @Query("SELECT COUNT(p.id) " +
           "FROM Post p " +
           "JOIN Board b ON p.boardId = b.id " +
           "JOIN User u ON p.userId = u.id " +
           "WHERE (:username = '' OR u.username LIKE %:username%) AND (:title = '' OR p.title LIKE %:title%) AND p.postType = 0 AND b.boardType = 0 ")
    int countNotiesALL(String title, String username);

    @Query("SELECT new com.wooriggiri.app.domain.PostDTO(p.id, p.postType, b.boardname, u.username, p.title, p.viewCount, p.createdDate) " +
           "FROM Post p " +
           "JOIN Board b ON p.boardId = b.id " +
           "JOIN User u ON p.userId = u.id " +
           "WHERE (:id IS NULL OR p.id = :id) AND (:title = '' OR p.title LIKE %:title%) AND p.postType = 0 AND b.boardType = 0 " +
           "ORDER BY p.createdDate DESC ")
    List<?> findAdminNoties(Long id, String title, Pageable pageable);

    @Query("SELECT COUNT(p.id) " +
           "FROM Post p " +
           "JOIN Board b ON p.boardId = b.id " +
           "JOIN User u ON p.userId = u.id " +
           "WHERE (:id IS NULL OR p.id = :id) AND (:title = '' OR p.title LIKE %:title%) AND p.postType = 0 AND b.boardType = 0 ")
    int countAdminNotiesALL(Long id, String title);

}