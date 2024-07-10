package com.wooriggiri.app.repository;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.wooriggiri.app.domain.CommentDTO;
import com.wooriggiri.app.entity.Comment;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {

    @Query("SELECT new com.wooriggiri.app.domain.CommentDTO(c.id, c.postId, c.commentType, b.boardname, u.username, c.content, c.parentCommentId, " +
    "c.createdDate, c.updatedDate) " +
    "FROM Comment c " + 
    "JOIN User u ON c.userId = u.id " +
    "JOIN Post p ON c.postId = p.id " +
    "JOIN Board b ON p.boardId = b.id " +
    "WHERE c.postId = :postId AND c.parentCommentId IS NULL AND c.commentType = 1 " +
    "ORDER BY c.createdDate ASC")
    List<CommentDTO> findFirstByPostId(int postId);

    @Query("SELECT new com.wooriggiri.app.domain.CommentDTO(c.id, c.postId, c.commentType, b.boardname, u.username, c.content, c.parentCommentId, " +
    "c.createdDate, c.updatedDate) " +
    "FROM Comment c " + 
    "JOIN User u ON c.userId = u.id " +
    "JOIN Post p ON c.postId = p.id " +
    "JOIN Board b ON p.boardId = b.id " +
    "WHERE c.parentCommentId = :commentId AND c.commentType = 1 " +
    "ORDER BY c.createdDate ASC")
    List<CommentDTO> findChildComment(Long commentId);

    @Query("SELECT new com.wooriggiri.app.domain.CommentDTO(c.id, c.postId, c.commentType, b.boardname, u.username, c.content, c.parentCommentId, " +
    "c.createdDate, c.updatedDate) " +
    "FROM Comment c " + 
    "JOIN User u ON c.userId = u.id " +
    "JOIN Post p ON c.postId = p.id " +
    "JOIN Board b ON p.boardId = b.id " +
    "WHERE c.userId = :userId AND c.commentType IN (1, 2) " +
    "ORDER BY c.createdDate DESC")
    List<?> findByUserId(Long userId);

    @Query("SELECT new com.wooriggiri.app.domain.CommentDTO(c.id, c.postId, c.commentType, b.boardname, u.username, c.content, c.parentCommentId, " +
    "c.createdDate, c.updatedDate) " +
    "FROM Comment c " + 
    "JOIN User u ON c.userId = u.id " +
    "JOIN Post p ON c.postId = p.id " +
    "JOIN Board b ON p.boardId = b.id " +
    "WHERE (:id IS NULL OR c.id = :id) AND (:content = '' OR c.content LIKE %:content%) AND (:username = '' OR u.username LIKE %:username%) AND (:boardname = '' OR b.boardname LIKE %:boardname%) " +
    "AND (:postId IS NULL OR p.id = :postId) AND p.postType IN (1, 2) AND b.boardType IN (1, 2) AND c.commentType IN (1, 2) " +
    "ORDER BY c.createdDate DESC")
    List<?> findComment(Long id, String content, String username, String boardname, Long postId, Pageable pageable);
    
    @Query("SELECT COUNT(c.id)" +
    "FROM Comment c " + 
    "JOIN User u ON c.userId = u.id " +
    "JOIN Post p ON c.postId = p.id " +
    "JOIN Board b ON p.boardId = b.id " +
    "WHERE (:id IS NULL OR c.id = :id) AND (:content = '' OR c.content LIKE %:content%) AND (:username = '' OR u.username LIKE %:username%) AND (:boardname = '' OR b.boardname LIKE %:boardname%) " +
    "AND (:postId IS NULL OR p.id = :postId) AND p.postType IN (1, 2) AND b.boardType IN (1, 2) AND c.commentType IN (1, 2) ")
    int countCommentALL(Long id, String content, String username, String boardname, Long postId);

    @Modifying
    @Transactional
    @Query("UPDATE Comment c SET c.commentType = :commentType WHERE c.id = :commentId")
    void updateCommentTypeById(Long commentId, int commentType);
}
