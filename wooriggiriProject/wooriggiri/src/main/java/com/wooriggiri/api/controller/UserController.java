package com.wooriggiri.api.controller;

import com.wooriggiri.api.model.User;
import com.wooriggiri.api.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public String registerUser(@RequestBody User user) {
        userService.registerNewUser(user);
        return "User registered successfully";
    }
}
