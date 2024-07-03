package com.wooriggiri.app.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.data.domain.Pageable;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.wooriggiri.app.domain.BoardItemDTO;
import com.wooriggiri.app.domain.BoardListDTO;
import com.wooriggiri.app.domain.ResponsDTO;
import com.wooriggiri.app.entity.Board;
import com.wooriggiri.app.repository.BoardRepository;
import com.wooriggiri.app.repository.PostRepository;
import com.wooriggiri.app.repository.UserRepository;

@Service
public class AppService {
    @Autowired
    private BoardRepository boardRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PostRepository postRepository;
    @Autowired
    private RedisTemplate<String, Object> redisTemplate;
    
    public ResponsDTO searchBoardByCommunityName(int page, String boardname) {
        List<?> result = new ArrayList<>();
        Map<String, Object> metadata = new HashMap<>();

        Pageable pageable = PageRequest.of(page-1, 20);
        Board board = boardRepository.findByBoardname(boardname);
        result = postRepository.findByBoardname(boardname, pageable);

        String cacheKey = "board_follower_count_" + boardname;

        String postsLengthStr = (String) redisTemplate.opsForValue().get(cacheKey);
        int postsLength = Integer.parseInt(postsLengthStr);
        int pageLength = (int) Math.ceil( postsLength / 10.0);

        metadata.put("boardname", board.getBoardname());
        metadata.put("description", board.getDescription());
        metadata.put("userId", board.getUserId());
        metadata.put("createdDate", board.getCreatedDate());
        metadata.put("updatedDate", board.getUpdatedDate());
        metadata.put("currentPage", page);
        metadata.put("postsLength", postsLength);
        metadata.put("pageLength", pageLength);

        ResponsDTO responsDTO = new ResponsDTO(result, metadata);

        return responsDTO;
    }

    public Map<String, List<BoardItemDTO>> searchNotiesPosts() {
        Map<String, List<BoardItemDTO>> contentData = new HashMap<>();
        Pageable pageable = PageRequest.of(0, 5);
        List<BoardItemDTO> noticePosts = postRepository.findNoticePosts(pageable);
        contentData.put("noticePosts", noticePosts);
        return contentData;
    }

    public Map<String, List<BoardItemDTO>> searchPopularPosts() {
        Map<String, List<BoardItemDTO>> contentData = new HashMap<>();
        Pageable pageable = PageRequest.of(0, 8);
        LocalDateTime oneWeekAgo = LocalDateTime.now().minusDays(7);
        List<BoardItemDTO> popularPosts = postRepository.findPopularPosts(oneWeekAgo, pageable);
        contentData.put("popularPosts", popularPosts);
        return contentData;
    }

    public Map<String, List<BoardListDTO>> searchPopularCommunities() {
        Map<String, List<BoardListDTO>> contentData = new HashMap<>();
        Pageable pageable = PageRequest.of(0, 8);
        LocalDateTime oneWeekAgo = LocalDateTime.now().minusDays(7);
        List<BoardListDTO> popularCommunities = boardRepository.findPopularCommunities(oneWeekAgo, pageable);
        contentData.put("popularCommunities", popularCommunities);
        return contentData;
    }

    public Map<String, List<BoardItemDTO>> searchMyCommunitiesPosts(int userId) {
        Map<String, List<BoardItemDTO>> contentData = new HashMap<>();
        Pageable pageable = PageRequest.of(0, 8);
        List<BoardItemDTO> myCommunitiesPosts = postRepository.findMyCommunitiesPosts(userId, pageable);
        contentData.put("myCommunitiesPosts", myCommunitiesPosts);
        return contentData;
    }

    public Map<String, List<BoardItemDTO>> searchFavoriteCommunityPosts(int userId) {
        Map<String, List<BoardItemDTO>> contentData = new HashMap<>();
        Pageable pageable = PageRequest.of(0, 8);
        List<BoardItemDTO> favoriteCommunityPosts = postRepository.findFavoriteCommunityPosts(userId, pageable);
        contentData.put("favoriteCommunityPosts", favoriteCommunityPosts);
        return contentData;
    }

    public Map<String, List<String>> searchCommunityList(int userId) {
        Map<String, List<String>> communityList = new HashMap<>();
        communityList.put("myCommunityList", boardRepository.findbyUserId(userId));
        communityList.put("favoriteCommunities", boardRepository.findFavoritesByUserID(userId));
        return communityList;
    }

    public Map<String, List<String>> searchBykeyWord(String keyword) {
        Map<String, List<String>> searchResults = new HashMap<>();
        List<String> communities = boardRepository.findCommunitiesByKeyword(keyword);
        List<String> users = userRepository.findUsersByKeyword(keyword);
        searchResults.put("communities", communities);
        searchResults.put("users", users);
        return searchResults;
    }
}