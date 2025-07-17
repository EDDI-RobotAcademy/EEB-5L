package com.example.monoproj.kakao_authentication.service;

import com.example.monoproj.account.entity.Account;
import com.example.monoproj.account.entity.LoginType;
import com.example.monoproj.account_profile.entity.AccountProfile;
import com.example.monoproj.account_profile.service.AccountProfileService;
import com.example.monoproj.config.FrontendConfig;
import com.example.monoproj.kakao_authentication.repository.KakaoAuthenticationRepository;
import com.example.monoproj.kakao_authentication.service.response.ExistingUserKakaoLoginResponse;
import com.example.monoproj.kakao_authentication.service.response.KakaoLoginResponse;
import com.example.monoproj.kakao_authentication.service.response.NewUserKakaoLoginResponse;
import com.example.monoproj.redis_cache.service.RedisCacheService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class KakaoAuthenticationServiceImpl implements KakaoAuthenticationService {
//    final private KakaoAuthenticationRepository kakaoAuthenticationRepository;
//
//    @Override
//    public String getLoginLink() {
//        return this.kakaoAuthenticationRepository.getLoginLink();
//    }
//
//    @Override
//    public Map<String, Object> requestAccessToken(String code) {
//        return this.kakaoAuthenticationRepository.getAccessToken(code);
//    }
//
//    @Override
//    public Map<String, Object> requestUserInfo(String accessToken) {
//        return this.kakaoAuthenticationRepository.getUserInfo(accessToken);
//    }

    private final KakaoAuthenticationRepository kakaoAuthRepository;
    private final AccountProfileService accountProfileService;
    private final RedisCacheService redisCacheService;
    private final FrontendConfig frontendConfig;

    // 리턴 타입을 보면 KakaoLoginResponse를 사용하고 있습니다.
    // 여기서 고려해야 하는 것이 기존 사용자와 신규 사용자를 분리하여 관리해야 한다는 부분입니다.
    // 그리고 `개인정보보호법` 에 따라 약관 처리가 필요하기 때문에도 위의 두 가지는 분리가 되어야 합니다.
    // (참고로 약관 페이지는 Front에서 보여주면 됨)
    @Override
    public KakaoLoginResponse handleLogin(String code) {
        // 실제 카카오 서버가 제공하는 access token을 획득하는 과정
        Map<String, Object> tokenResponse = kakaoAuthRepository.getAccessToken(code);
        String accessToken = (String) tokenResponse.get("access_token");

        // 사용자의 개인 정보들을 뽑아내기 위한 파트(nickname, email)
        Map<String, Object> userInfo = kakaoAuthRepository.getUserInfo(accessToken);
        String nickname = extractNickname(userInfo);
        String email = extractEmail(userInfo);

        String origin = frontendConfig.getOrigins().get(0);
        Optional<AccountProfile> optionalProfile =
                accountProfileService.loadProfileByEmailAndLoginType(email, LoginType.KAKAO);

        if (optionalProfile.isEmpty()) {
            String tempToken = createTemporaryUserToken(accessToken);
            return new NewUserKakaoLoginResponse(tempToken, nickname, email, origin);
        }

        Account account = optionalProfile.get().getAccount();
        String userToken = createUserTokenWithAccessToken(account, accessToken);
        return new ExistingUserKakaoLoginResponse(userToken, nickname, email, origin);
    }

    private String extractNickname(Map<String, Object> userInfo) {
        // `?` 는 wildcard라는 것으로 무엇이든 다 받을 수 있는 Object 같은 녀석입니다.
        // 위와 같은 구성을 가지는 이유는 사실 Kakao던 뭐던 보내주는 응답이 어떤 형식일지 보장을 못하기 때문입니다.
        // 비즈니스 상황에 따라서 리턴하는 스타일들이 다양하게 변할 수 있기 때문에 wildcard를 사용할 필요가 있습니다.
        // Map<String, Object> <- Map<?, ?> 과 유사한 역할을 할 수 있습니다.
        return (String) ((Map<?, ?>) userInfo.get("properties")).get("nickname");
    }

    private String extractEmail(Map<String, Object> userInfo) {
        return (String) ((Map<?, ?>) userInfo.get("kakao_account")).get("email");
    }

    private String createTemporaryUserToken(String accessToken) {
        String token = UUID.randomUUID().toString();
        redisCacheService.setKeyAndValue(token, accessToken, Duration.ofMinutes(5));
        return token;
    }

    private String createUserTokenWithAccessToken(Account account, String accessToken) {
        String userToken = UUID.randomUUID().toString();
        redisCacheService.setKeyAndValue(account.getId(), accessToken);
        redisCacheService.setKeyAndValue(userToken, account.getId());
        return userToken;
    }
}
