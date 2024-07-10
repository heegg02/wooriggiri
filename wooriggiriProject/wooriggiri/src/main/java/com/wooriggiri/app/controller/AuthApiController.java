package com.wooriggiri.app.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.wooriggiri.app.domain.BoardItemDTO;
import com.wooriggiri.app.domain.BoardRequestDTO;
import com.wooriggiri.app.domain.CommentRequestDTO;
import com.wooriggiri.app.domain.DeleteDTO;
import com.wooriggiri.app.domain.FavoriteRequestDTO;
import com.wooriggiri.app.domain.NotiesRequestDTO;
import com.wooriggiri.app.domain.PostRequestDTO;
import com.wooriggiri.app.domain.ResponsDTO;
import com.wooriggiri.app.domain.ChildCommentRequestDTO;
import com.wooriggiri.app.service.AppService;




@RestController
@RequestMapping("/authapi")
public class AuthApiController {

    @Autowired
    private AppService appService;

    @GetMapping("/admincomment")
    public ResponseEntity<?> adminComment(@RequestParam(name="page", required=false, defaultValue="1") int page,
                                       @RequestParam(name="id", required=false, defaultValue="") Long id,
                                       @RequestParam(name="content", required=false, defaultValue="") String content,
                                       @RequestParam(name="username", required=false, defaultValue="") String username,
                                       @RequestParam(name="postId", required=false, defaultValue="") Long postId,
                                       @RequestParam(name="boardname", required=false, defaultValue="") String boardname) {
        ResponsDTO response = appService.searchComment(page, id, content, username, boardname, postId);
        return ResponseEntity.ok().body(response);
    }

    @GetMapping("/adminnoties")
    public ResponseEntity<?> adminNoties(@RequestParam(name="page", required=false, defaultValue="1") int page,
                                       @RequestParam(name="id", required=false, defaultValue="") Long id,
                                       @RequestParam(name="title", required=false, defaultValue="") String title) {
        ResponsDTO response = appService.searchAdminNoties(page, id, title);
        return ResponseEntity.ok().body(response);
    }

    @GetMapping("/adminpost")
    public ResponseEntity<?> adminPost(@RequestParam(name="page", required=false, defaultValue="1") int page,
                                       @RequestParam(name="id", required=false, defaultValue="") Long id,
                                       @RequestParam(name="title", required=false, defaultValue="") String title,
                                       @RequestParam(name="username", required=false, defaultValue="") String username,
                                       @RequestParam(name="boardname", required=false, defaultValue="") String boardname) {
        ResponsDTO response = appService.searchPost(page, id, title, username, boardname);
        return ResponseEntity.ok().body(response);
    }

    @GetMapping("/adminuser")
    public ResponseEntity<?> adminUser(@RequestParam(name="page", required=false, defaultValue="1") int page,
                                            @RequestParam(name="id", required=false, defaultValue="") Long id,
                                            @RequestParam(name="username", required=false, defaultValue="") String username) {
        ResponsDTO response = appService.searchUser(page, id, username);
        return ResponseEntity.ok().body(response);
    }
    
    @GetMapping("/adminboard")
    public ResponseEntity<?> adminBoard(@RequestParam(name="page", required=false, defaultValue="1") int page,
                                            @RequestParam(name="id", required=false, defaultValue="") Long id,
                                            @RequestParam(name="username", required=false, defaultValue="") String username,
                                            @RequestParam(name="boardname", required=false, defaultValue="") String boardname) {
        ResponsDTO response = appService.searchBoard(page, id, username, boardname);
        return ResponseEntity.ok().body(response);
    }
    
    @PostMapping("/deleteuser")
    public ResponseEntity<?> deleteUser(@RequestBody DeleteDTO deleteDTO) {
        appService.deleteUser(deleteDTO.getId());
        return ResponseEntity.ok().body("삭제 완료");
    }

    @PostMapping("/deletepost")
    public ResponseEntity<?> deletePost(@RequestBody DeleteDTO deleteDTO) {
        appService.deletePost(deleteDTO.getId());
        return ResponseEntity.ok().body("삭제 완료");
    }

    @PostMapping("/deletecomment")
    public ResponseEntity<?> deleteComment(@RequestBody DeleteDTO deleteDTO) {
        appService.deleteComment(deleteDTO.getId());
        return ResponseEntity.ok().body("삭제 완료");
    }
    
    @PostMapping("/deleteboard")
    public ResponseEntity<?> deleteBoard(@RequestBody DeleteDTO deleteDTO) {
        appService.deleteBoard(deleteDTO.getId());
        return ResponseEntity.ok().body("삭제 완료");
    }
    
    @GetMapping("/checkfavorite")
    public ResponseEntity<?> checkFavorite(@RequestParam Long userId, @RequestParam Long boardId) {
        boolean isFavorite = appService.isFavorite(userId, boardId);
        return ResponseEntity.ok().body(isFavorite);
    }

    @PostMapping("/favoriteboard")
    public ResponseEntity<?> favoriteboard(@RequestBody FavoriteRequestDTO favoriteRequest) {
        appService.favoriteboard(favoriteRequest);
        return ResponseEntity.ok().body(!(favoriteRequest.isFavorite()));
    }

    @PostMapping("/insertcomment")
    public ResponseEntity<?> insertComment(@RequestBody CommentRequestDTO commentRequest) {
        appService.insertComment(commentRequest);
        return ResponseEntity.ok().body("등록 완료");
    }

    @PostMapping("/insertchildcomment")
    public ResponseEntity<?> insertChildComment(@RequestBody ChildCommentRequestDTO commentRequest) {
        appService.insertChildComment(commentRequest);
        return ResponseEntity.ok().body("등록 완료");
    }

    @PostMapping("/insertnoties")
    public ResponseEntity<?> insertNoties(@RequestBody NotiesRequestDTO notiesRequestDTO){
        appService.insertNoties(notiesRequestDTO);
        return ResponseEntity.ok().body("등록 완료");
    }


    @PostMapping("/insertpost")
    public ResponseEntity<?> insertPost(@RequestBody PostRequestDTO postRequestDTO){
        appService.insertPost(postRequestDTO);
        return ResponseEntity.ok().body("등록 완료");
    }

    @PostMapping("/insertboard")
    public ResponseEntity<?> insertboard(@RequestBody BoardRequestDTO boardRequestDTO){
        appService.insertBoard(boardRequestDTO);
        return ResponseEntity.ok().body("등록 완료");
    }

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
