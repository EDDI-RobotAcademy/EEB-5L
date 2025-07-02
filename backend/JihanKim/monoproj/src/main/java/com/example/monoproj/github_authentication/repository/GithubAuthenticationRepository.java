package com.example.monoproj.github_authentication.repository;

import java.util.Map;

public interface GithubAuthenticationRepository {
    String getLoginLink();
    Map<String, Object> getAccessToken(String code);

    Map<String, Object> getUserInfo(String accessToken);
}
