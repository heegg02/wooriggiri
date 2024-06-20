package com.wooriggiri.api.service;

import org.springframework.beans.factory.annotation.Autowired;

import com.wooriggiri.api.dto.UserDto;
import com.wooriggiri.api.model.User;
import com.wooriggiri.api.repository.UserRepository;

public class UserService {

    @Autowired
    private UserRepository userRepository;

    public void save(UserDto userDto) {
        User user = new User();
        user.setUsername(userDto.getUsername());
        user.setPassword(userDto.getPassword());
        userRepository.saveUser(user.getUsername(), user.getPassword(), user.getEmail());
    }
}
