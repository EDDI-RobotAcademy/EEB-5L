package com.example.monoproj.kakao_authentication.controller;

import com.example.monoproj.account.entity.Account;
import com.example.monoproj.account.entity.LoginType;
import com.example.monoproj.account.service.AccountService;
import com.example.monoproj.account_profile.entity.AccountProfile;
import com.example.monoproj.account_profile.service.AccountProfileService;
import com.example.monoproj.config.FrontendConfig;
import com.example.monoproj.kakao_authentication.controller.request_form.AccessTokenRequestForm;
import com.example.monoproj.kakao_authentication.service.KakaoAuthenticationService;
import com.example.monoproj.redis_cache.service.RedisCacheService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/kakao-authentication")
public class KakaoAuthenticationController {
    final private KakaoAuthenticationService kakaoAuthenticationService;
    final private AccountService accountService;
    final private AccountProfileService accountProfileService;
    final private RedisCacheService redisCacheService;
    final private FrontendConfig frontendConfig;

    @GetMapping("/request-login-url")
    public String requestGetLoginLink() {
        log.info("requestGetLoginLink() called");

        return kakaoAuthenticationService.getLoginLink();
    }

    @GetMapping("/login")
    @Transactional
    public void requestAccessToken(@RequestParam("code") String code,
                                   HttpServletResponse response) throws IOException {

        log.info("requestAccessToken(): code {}", code);

        try {
            Map<String, Object> tokenResponse = kakaoAuthenticationService.requestAccessToken(code);
            String accessToken = (String) tokenResponse.get("access_token");

            Map<String, Object> userInfo = kakaoAuthenticationService.requestUserInfo(accessToken);
            log.info("userInfo: {}", userInfo);

            String nickname = (String) ((Map) userInfo.get("properties")).get("nickname");
            String email = (String) ((Map) userInfo.get("kakao_account")).get("email");
            log.info("email: {}", email);

            Optional<AccountProfile> optionalProfile = accountProfileService.loadProfileByEmailAndLoginType(email, LoginType.KAKAO);
            Account account = null;

            if (optionalProfile.isPresent()) {
                account = optionalProfile.get().getAccount();
                log.info("account (existing): {}", account);
            }

            if (account == null) {
                log.info("New user detected. Creating account and profile...");
                account = accountService.createAccount(LoginType.KAKAO);
                accountProfileService.createAccountProfile(account, nickname, email);
            }

            String userToken = createUserTokenWithAccessToken(account, accessToken);

            String origin = frontendConfig.getOrigins().get(0);
            String htmlResponse = """
            <html>
              <body>
                <script>
                  window.opener.postMessage({
                    accessToken: '%s',
                    user: { name: '%s', email: '%s' }
                  }, '%s');
                  window.close();
                </script>
              </body>
            </html>
            """.formatted(userToken, nickname, email, origin);

            response.setContentType("text/html;charset=UTF-8");
            response.getWriter().write(htmlResponse);

        } catch (Exception e) {
            log.error("Kakao 로그인 에러", e);
            response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "카카오 로그인 실패: " + e.getMessage());
        }
    }

    private String createUserTokenWithAccessToken(Account account, String accessToken) {
        try {
            String userToken = UUID.randomUUID().toString();
            redisCacheService.setKeyAndValue(account.getId(), accessToken);
            redisCacheService.setKeyAndValue(userToken, account.getId());
            return userToken;
        } catch (Exception e) {
            throw new RuntimeException("Error storing token in Redis: " + e.getMessage());
        }
    }
}
