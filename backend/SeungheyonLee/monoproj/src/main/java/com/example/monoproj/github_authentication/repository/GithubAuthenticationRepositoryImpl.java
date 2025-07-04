package com.example.monoproj.github_authentication.repository;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.stereotype.Repository;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;

@Slf4j
@Repository
public class GithubAuthenticationRepositoryImpl implements GithubAuthenticationRepository {
    private final String loginUrl;
    private final String clientId;
    private final String clientSecret;
    private final String redirectUri;
    private final String tokenRequestUri;
    private final String userInfoRequestUri;

    private final RestTemplate restTemplate;

    public GithubAuthenticationRepositoryImpl(
            @Value("${github.login-url}") String loginUrl,
            @Value("${github.client-id}") String clientId,
            @Value("${github.client-secret}") String clientSecret,
            @Value("${github.redirect-uri}") String redirectUri,
            @Value("${github.token-request-uri}") String tokenRequestUri,
            @Value("${github.user-info-request-uri}") String userInfoRequestUri,
            RestTemplate restTemplate
    ) {
        this.loginUrl = loginUrl;
        this.clientId = clientId;
        this.clientSecret = clientSecret;
        this.redirectUri = redirectUri;
        this.tokenRequestUri = tokenRequestUri;
        this.userInfoRequestUri = userInfoRequestUri;

        this.restTemplate = restTemplate;
    }

    public String getLoginLink() {
        System.out.println("getLoginLink() for Login");
        return String.format("%s/oauth/authorize?client_id=%s&redirect_uri=%s&response_type=code",
                loginUrl, clientId, redirectUri);
    }

    public Map<String, Object> getAccessToken(String code) {
        MultiValueMap<String, String> formData = new LinkedMultiValueMap<>();
        formData.add("grant_type", "authorization_code");
        formData.add("client_id", clientId);
        formData.add("client_secret", clientSecret);
        formData.add("redirect_uri", redirectUri);
        formData.add("code", code);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        HttpEntity<MultiValueMap<String, String>> entity = new HttpEntity<>(formData, headers);

        ResponseEntity<Map> response = restTemplate.exchange(
                tokenRequestUri, HttpMethod.POST, entity, Map.class);

        return response.getBody();
    }

    @Override
    public Map<String, Object> getUserInfo(String accessToken) {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + accessToken);

        HttpEntity<String> entity = new HttpEntity<>(headers);

        ResponseEntity<Map> response = restTemplate.exchange(
                userInfoRequestUri, HttpMethod.GET, entity, Map.class);

        log.info("User Info: {}", response.getBody());

        return response.getBody();
    }

    @Override
    public List<Map<String, Object>> getUserEmails(String accessToken) {
        // 요청 헤더 생성: Authorization 헤더에 Bearer 토큰 설정
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(accessToken); // "Authorization: Bearer <accessToken>"
        headers.setAccept(List.of(MediaType.APPLICATION_JSON)); // 응답 타입은 JSON

        // 헤더를 포함한 HTTP 요청 엔티티 생성
        HttpEntity<?> entity = new HttpEntity<>(headers);

        // GitHub API 호출: 비공개 이메일까지 포함된 사용자 이메일 목록 조회
        ResponseEntity<List<Map<String, Object>>> response = restTemplate.exchange(
                "https://api.github.com/user/emails", // GitHub 이메일 API 엔드포인트
                HttpMethod.GET,                       // GET 메서드 사용
                entity,                               // 인증 및 Accept 헤더 포함
                new ParameterizedTypeReference<>() {} // List<Map<String, Object>>라는 복잡한 제네릭 타입을 런타임에도 유지하기위해서 익명 클래스를 생성해서 타입 정보를 보존
        );
        log.info("response: {}", response.getBody());

        return response.getBody();
    }



}

