package com.wooriggiri.api.controller;

import com.wooriggiri.api.model.LoginDto;
import com.wooriggiri.api.model.User;
import com.wooriggiri.api.model.UserDto;
import com.wooriggiri.api.model.UsernameRequest;
import com.wooriggiri.api.service.UserService;
import com.wooriggiri.api.util.JwtUtil;

import jakarta.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;



@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserService userService;

    @PostMapping("/checkusername")
    public ResponseEntity<?> checkUsername(@RequestBody UsernameRequest username) {
        try {
            boolean isDuplicate = userService.checkUsernameExists(username.getUsername());
            System.out.println(isDuplicate);
            return ResponseEntity.ok().body(isDuplicate);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Find username failed");
        }
    }
    
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody UserDto userDto) {
        try {
            userService.save(userDto);

            UserDetails userDetails = userService.loadUserByUsername(userDto.getUsername());
            String accessToken = jwtUtil.generateToken(userDetails.getUsername());

            HttpHeaders headers = new HttpHeaders();
            headers.add("Access-Token", accessToken);

            return ResponseEntity.ok().headers(headers).body("User registered successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("User registration failed");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDto loginDto) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginDto.getUsername(), loginDto.getPassword())
            );

            UserDetails userDetails = userService.loadUserByUsername(loginDto.getUsername());
            
            String accessToken = jwtUtil.generateToken(userDetails.getUsername());

            HttpHeaders headers = new HttpHeaders();
            headers.add("Access-Token", accessToken);

            return ResponseEntity.ok().headers(headers).body("User logined successfully");
        } catch (AuthenticationException e) {
            return ResponseEntity.badRequest().body("User login failed");
        }
    }

    @GetMapping("/user")
    public ResponseEntity<?> userProfile(HttpServletRequest request) {
        try {
            String authorizationHeader = request.getHeader("Authorization");
            String jwt = authorizationHeader.substring(7);
            String username = jwtUtil.extractUsername(jwt);

            User user = userService.foundUserProfile(username);
            return ResponseEntity.ok().body(user);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("User login failed");
        }
    }
    
}
