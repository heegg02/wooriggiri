package com.wooriggiri.api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wooriggiri.api.service.CommunityService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/api")
public class MainController {

    @Autowired
    private CommunityService postService;

    @GetMapping("/mycommunitylist")
    public ResponseEntity<?> myCommunityList(@RequestParam int userId) {
        try {
            System.out.println(userId);
            List<String> communityList = postService.foundCommunityList(userId);
            System.out.println(communityList);
            return ResponseEntity.ok().body(communityList);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Find username failed");
        }
    }
    
}
