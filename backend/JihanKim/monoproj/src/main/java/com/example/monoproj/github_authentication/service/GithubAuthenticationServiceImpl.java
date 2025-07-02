package com.example.monoproj.github_authentication.service;

import com.example.monoproj.github_authentication.repository.GithubAuthenticationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class GithubAuthenticationServiceImpl implements GithubAuthenticationService {
    final private GithubAuthenticationRepository githubAuthenticationRepository;

    @Override
    public String getLoginLink() {
        return this.githubAuthenticationRepository.getLoginLink();
    }

    @Override
    public Map<String, Object> requestAccessToken(String code) {
        return this.githubAuthenticationRepository.getAccessToken(code);
    }

    @Override
    public Map<String, Object> requestUserInfo(String accessToken) {
        return githubAuthenticationRepository.getUserInfo(accessToken);
    }
}
