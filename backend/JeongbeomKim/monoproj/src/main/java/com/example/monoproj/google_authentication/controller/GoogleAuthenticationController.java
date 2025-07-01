package com.example.monoproj.google_authentication.controller;

import com.example.monoproj.account.entity.Account;
import com.example.monoproj.account.entity.LoginType;
import com.example.monoproj.account.service.AccountService;
import com.example.monoproj.account_profile.entity.AccountProfile;
import com.example.monoproj.account_profile.service.AccountProfileService;
import com.example.monoproj.google_authentication.service.GoogleAuthenticationService;
import com.example.monoproj.kakao_authentication.controller.request_form.AccessTokenRequestForm;
import com.example.monoproj.redis_cache.service.RedisCacheService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@Slf4j
@RestController
@RequestMapping("/google-authentication")
@RequiredArgsConstructor
public class GoogleAuthenticationController {
    final private GoogleAuthenticationService googleAuthenticationService;
    final private AccountService accountService;
    final private AccountProfileService accountProfileService;
    final private RedisCacheService redisCacheService;

    @GetMapping("/request-login-url")
    public String requestGetLoginLink() {
        log.info("requestGetLoginLink() called");

        return googleAuthenticationService.getLoginLink();
    }

    @GetMapping("/login")
    @Transactional
    public void requestAccessToken(@RequestParam("code") String code, HttpServletResponse response) throws IOException {
        log.info("requestAccessToken(): code {}", code);

        try {
            Map<String, Object> tokenResponse = googleAuthenticationService.requestAccessToken(code);
            String accessToken = (String) tokenResponse.get("access_token");

            Map<String, Object> userInfo = googleAuthenticationService.requestUserInfo(accessToken);
            log.info("userInfo: {}", userInfo);

            String email = (String) userInfo.get("email");
            String nickname = (String) userInfo.get("name");
            log.info("email: {}, nickname: {}", email, nickname);

            Optional<AccountProfile> optionalProfile = accountProfileService.loadProfileByEmailAndLoginType(email, LoginType.GOOGLE);
            Account account = null;

            if (optionalProfile.isPresent()) {
                account = optionalProfile.get().getAccount();
                log.info("account (existing): {}", account);
            }

            if (account == null) {
                log.info("New user detected. Creating account and profile...");
                account = accountService.createAccount(LoginType.GOOGLE);
                accountProfileService.createAccountProfile(account, nickname, email);
            }

            String userToken = createUserTokenWithAccessToken(account, accessToken);

            String htmlResponse = """
            <html>
              <body>
                <script>
                  window.opener.postMessage({
                    accessToken: '%s',
                    user: { name: '%s', email: '%s' }
                  }, 'http://localhost');
                  window.close();
                </script>
              </body>
            </html>
            """.formatted(userToken, nickname, email);

            response.setContentType("text/html;charset=UTF-8");
            response.getWriter().write(htmlResponse);

        } catch (Exception e) {
            log.error("Google 로그인 에러", e);
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
