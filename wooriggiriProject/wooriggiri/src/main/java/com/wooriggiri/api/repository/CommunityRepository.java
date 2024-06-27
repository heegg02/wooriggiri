package com.wooriggiri.api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.wooriggiri.api.model.Community;

@Repository
public interface CommunityRepository extends JpaRepository<Community, Long> {
    @Query("SELECT c.communityName FROM Community c WHERE c.userId = :userId")
    List<String> findbyUserId(@Param("userId") int userId);
}
