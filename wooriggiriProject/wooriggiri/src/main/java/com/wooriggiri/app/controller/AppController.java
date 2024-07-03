package com.wooriggiri.app.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wooriggiri.app.domain.BoardItemDTO;
import com.wooriggiri.app.domain.BoardListDTO;
import com.wooriggiri.app.domain.ResponsDTO;
import com.wooriggiri.app.service.AppService;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/api")
public class AppController {

    @Autowired
    private AppService appService;

    @GetMapping("/communityposts")
    public ResponseEntity<?> communityPosts(@RequestParam int page, @RequestParam String communityname) {
        // try {
            System.out.println(page);
            System.out.println(communityname);
            ResponsDTO response = appService.searchBoardByCommunityName(page, communityname);
            return ResponseEntity.ok().body(response);
        // } catch (Exception e) {
        //     return ResponseEntity.badRequest().body("Get failed");
        // }
    }

    @GetMapping("/notiesposts")
    public ResponseEntity<?> notiesPosts() {
        try {
            Map<String, List<BoardItemDTO>> contentData = appService.searchNotiesPosts();

            return ResponseEntity.ok().body(contentData);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Get failed");
        }
    }

    @GetMapping("/popularposts")
    public ResponseEntity<?> popularPosts() {
        try {
            Map<String, List<BoardItemDTO>> contentData = appService.searchPopularPosts();

            return ResponseEntity.ok().body(contentData);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Get failed");
        }
    }

    @GetMapping("/popularcommunities")
    public ResponseEntity<?> popularCommunities() {
        try {
            Map<String, List<BoardListDTO>> contentData = appService.searchPopularCommunities();

            return ResponseEntity.ok().body(contentData);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Get failed");
        }
    }    
    
    @GetMapping("/communitylist")
    public ResponseEntity<?> communityList(@RequestParam int userId) {
        try {
            Map<String, List<String>> communityList = appService.searchCommunityList(userId);
            
            return ResponseEntity.ok().body(communityList);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Get failed");
        }
    }

    @GetMapping("/search")
    public ResponseEntity<?> search(@RequestParam String keyword) {
        try {
            Map<String, List<String>> searchResults = appService.searchBykeyWord(keyword);
            
            return ResponseEntity.ok().body(searchResults);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Get failed");
        }
    }    
}
