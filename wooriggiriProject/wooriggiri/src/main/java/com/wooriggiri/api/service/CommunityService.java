package com.wooriggiri.api.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wooriggiri.api.repository.CommunityRepository;

@Service
public class CommunityService {
    @Autowired
    private CommunityRepository postRepository;
    
    public List<String> foundCommunityList(int userId) {
        return postRepository.findbyUserId(userId);
    }
}
