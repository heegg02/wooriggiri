package com.wooriggiri.api.controller;

import com.wooriggiri.api.util.JwtTokenUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class JwtRefreshTokenController {

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private UserDetailsService userDetailsService;

    @PostMapping("/refresh")
    public ResponseEntity<?> refreshAuthToken(@RequestParam("refreshToken") String refreshToken) {
        String username = jwtTokenUtil.getUsernameFromToken(refreshToken);
        UserDetails userDetails = userDetailsService.loadUserByUsername(username);

        if (jwtTokenUtil.validateToken(refreshToken, userDetails)) {
            String newAccessToken = jwtTokenUtil.generateAccessToken(userDetails);
            return ResponseEntity.ok(newAccessToken);
        } else {
            return ResponseEntity.status(403).body("Invalid Refresh Token");
        }
    }
}
