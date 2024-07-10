package com.wooriggiri.app.repository;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.wooriggiri.app.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);

    @Query("SELECT u.username FROM User u WHERE u.username LIKE %:keyword%")
    List<String> findUsersByKeyword(String keyword);

    @Query("SELECT new com.wooriggiri.app.domain.UserDTO(u.id, u.userType, u.username, u.createdDate) " +
           "FROM User u " +
           "WHERE (:id IS NULL OR u.id = :id) AND (:username = '' OR u.username LIKE %:username%) AND u.userType IN (1, 2) " +
           "ORDER BY u.createdDate DESC")
    List<?> findUser(Long id, String username, Pageable pageable);

    @Query("SELECT COUNT(u.id) " +
           "FROM User u " +
           "WHERE (:id IS NULL OR u.id = :id) AND (:username = '' OR u.username LIKE %:username%) AND u.userType IN (1, 2) ")
    int countUserALL(Long id, String username);

    @Modifying
    @Transactional
    @Query("UPDATE User u SET u.userType = :userType WHERE u.id = :userId")
    void updateUserTypeById(Long userId, int userType);
}