package com.wooriggiri.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.wooriggiri.app.entity.UserFavorite;

public interface UserFavoriteRepository extends JpaRepository<UserFavorite, Long> {

    int countByUserId(Long userId);
}
