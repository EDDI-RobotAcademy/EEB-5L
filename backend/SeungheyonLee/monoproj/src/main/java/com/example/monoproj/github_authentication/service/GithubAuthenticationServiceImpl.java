package com.example.monoproj.github_authentication.service;

import com.example.monoproj.github_authentication.repository.GithubAuthenticationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
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
        return this.githubAuthenticationRepository.getUserInfo(accessToken);
    }

    @Override
    public String requestPrimaryEmail(String accessToken) {
        List<Map<String, Object>> emails = githubAuthenticationRepository.getUserEmails(accessToken);

        // primary=true인 이메일 항목을 찾아 반환
        // - 이메일 목록 중 '기본 이메일(primary)'을 필터링 -이렇게하지않으면 다른값이 입력될수 있음
        // - 첫 번째 항목의 "email" 값을 반환
        return emails.stream()
                .filter(e -> Boolean.TRUE.equals(e.get("primary"))) // primary 이메일 필터
                .map(e -> (String) e.get("email"))                  // email 값 추출
                .findFirst()                                                         // 첫 번째 결과 선택
                .orElse(null);                                                  // 없으면 null 반환
    }

}
