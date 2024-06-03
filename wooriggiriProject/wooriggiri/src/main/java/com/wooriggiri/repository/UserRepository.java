package com.wooriggiri.repository;

import com.wooriggiri.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
