package com.wooriggiri.app.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.wooriggiri.app.domain.BoardItemDTO;
import com.wooriggiri.app.service.AppService;




@RestController
@RequestMapping("/authapi")
public class AuthApiController {

    @Autowired
    private AppService appService;
    
    @GetMapping("/mycommunitiesposts")
    public ResponseEntity<?> myCommunitiesPosts(@RequestParam int userId) {
        try {
            Map<String, List<BoardItemDTO>> contentData = appService.searchMyCommunitiesPosts(userId);

            return ResponseEntity.ok().body(contentData);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Post failed");
        }
    }

    @GetMapping("/favoritecommunityposts")
    public ResponseEntity<?> favoriteCommunityPosts(@RequestParam int userId) {
        try {
            Map<String, List<BoardItemDTO>> contentData = appService.searchFavoriteCommunityPosts(userId);

            return ResponseEntity.ok().body(contentData);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Post failed");
        }
    }
}
