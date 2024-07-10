package com.wooriggiri.app.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import com.wooriggiri.app.entity.Board;
import com.wooriggiri.app.entity.User;
import com.wooriggiri.app.repository.BoardFavoriteRepository;
import com.wooriggiri.app.repository.BoardRepository;
import com.wooriggiri.app.repository.PostRepository;
import com.wooriggiri.app.repository.UserFavoriteRepository;
import com.wooriggiri.app.repository.UserRepository;

import jakarta.annotation.PostConstruct;

@Service
public class CacheInitializationService {

    @Autowired
    private BoardRepository boardRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private BoardFavoriteRepository boardFavoriteRepository;

    @Autowired
    private UserFavoriteRepository userFavoriteRepository;

    @Autowired
    private RedisTemplate<String, Object> redisTemplate;

    @PostConstruct
    public void initializeBoardFollowerCache() {
        List<Board> boards = boardRepository.findAll();

        for (Board board : boards) {
            String cacheKey = "board_follower_count_" + board.getId();
            int count = boardFavoriteRepository.countByBoardId(board.getId());
            redisTemplate.opsForValue().set(cacheKey, count);
        }
    }

    @PostConstruct
    public void initializeUserFollowerCache() {

        List<User> users = userRepository.findAll();

        for (User user : users) {
            String cacheKey = "user_follower_count_" + user.getId();
            int count = userFavoriteRepository.countByUserId(user.getId());
            redisTemplate.opsForValue().set(cacheKey, count);
        }
    }

    @PostConstruct
    public void initializeBoardPostsLengthCache() {

        List<Board> boards = boardRepository.findAll();

        for (Board board : boards) {
            String cacheKey = "board_postsLength_count_" + board.getId();
            int count = postRepository.countByBoardId(board.getId());
            redisTemplate.opsForValue().set(cacheKey, count);
        }
    }

    @PostConstruct
    public void initializeUserPostsLengthCache() {

        List<User> users = userRepository.findAll();

        for (User user : users) {
            String cacheKey = "user_postsLength_count_" + user.getId();
            int count = postRepository.countByUserId(user.getId());
            redisTemplate.opsForValue().set(cacheKey, count);
        }
    }
}
