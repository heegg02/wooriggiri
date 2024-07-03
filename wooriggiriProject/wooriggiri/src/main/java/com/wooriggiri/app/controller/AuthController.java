package com.wooriggiri.app.controller;

import jakarta.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.wooriggiri.app.domain.LoginDTO;
import com.wooriggiri.app.domain.SignupDTO;
import com.wooriggiri.app.entity.User;
import com.wooriggiri.app.service.UserService;
import com.wooriggiri.app.util.JwtUtil;




@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserService userService;

    @GetMapping("/checkusername")
    public ResponseEntity<?> checkUsername(@RequestParam String username) {
        try {
            boolean isDuplicate = userService.checkUsernameExists(username);
            return ResponseEntity.ok().body(isDuplicate);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Post failed");
        }
    }
    
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody SignupDTO userDto) {
        try {
            userService.save(userDto);

            UserDetails userDetails = userService.loadUserByUsername(userDto.getUsername());
            String accessToken = jwtUtil.generateToken(userDetails.getUsername());

            HttpHeaders headers = new HttpHeaders();
            headers.add("Access-Token", accessToken);

            return ResponseEntity.ok().headers(headers).body("User registered successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Post failed");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDTO loginDto) {
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
            return ResponseEntity.badRequest().body("Post failed");
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
            return ResponseEntity.badRequest().body("Get failed");
        }
    }
}
