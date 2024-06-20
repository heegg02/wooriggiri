package com.wooriggiri.api.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;

public class UserRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public void saveUser(String username, String password, String email) {
        jdbcTemplate.update("INSERT INTO user (username, password, email) VALUES (?, ?, ?)",
                            username, password, email);
    }
}