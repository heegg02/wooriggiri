package com.wooriggiri.api.controller;

import com.wooriggiri.api.dto.LoginRequest;
import com.wooriggiri.api.model.User;
import com.wooriggiri.api.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/signup")
    public String signUp(@RequestBody User user) {
        User savedUser = userService.saveUser(user);
        return userService.generateToken(savedUser);
    }

    @PostMapping("/login")
    public String login(@RequestBody LoginRequest loginRequest) {
        return userService.authenticate(loginRequest.getEmail(), loginRequest.getPassword());
    }
}