package com.wooriggiri.app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.wooriggiri.app.domain.CommentDTO;
import com.wooriggiri.app.entity.Comment;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {

    @Query("SELECT new com.wooriggiri.app.domain.CommentDTO(c.id, c.commentType, u.username, c.content, c.parentCommentId, " +
    "c.orderNumber, c.depth, c.createdDate, c.updatedDate) " +
    "FROM Comment c " + 
    "JOIN User u ON c.userId = u.id " +
    "WHERE c.postId = :postId AND c.depth = 1 " +
    "ORDER BY c.orderNumber ASC")
    List<CommentDTO> findFirstByPostId(int postId);

    @Query("SELECT new com.wooriggiri.app.domain.CommentDTO(c.id, c.commentType, u.username, c.content, c.parentCommentId, " +
    "c.orderNumber, c.depth, c.createdDate, c.updatedDate) " +
    "FROM Comment c " + 
    "JOIN User u ON c.userId = u.id " +
    "WHERE c.parentCommentId = :commentId " +
    "ORDER BY c.orderNumber ASC")
    List<CommentDTO> findChildComment(Long commentId);
}
