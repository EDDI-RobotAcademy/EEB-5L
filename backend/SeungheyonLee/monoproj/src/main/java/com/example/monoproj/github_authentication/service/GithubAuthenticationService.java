package com.example.monoproj.github_authentication.service;

import java.util.Map;

public interface GithubAuthenticationService {
    String getLoginLink();
    Map<String, Object> requestAccessToken(String code);
    Map<String, Object> requestUserInfo(String accessToken);

    String requestPrimaryEmail(String accessToken);
}