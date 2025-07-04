package com.example.monoproj.github_authentication.controller;

import com.example.monoproj.account.entity.Account;
import com.example.monoproj.account.service.AccountService;
import com.example.monoproj.account_profile.entity.AccountProfile;
import com.example.monoproj.account_profile.service.AccountProfileService;
import com.example.monoproj.github_authentication.service.GithubAuthenticationService;
import com.example.monoproj.google_authentication.service.GoogleAuthenticationService;
import com.example.monoproj.redis_cache.service.RedisCacheService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@Slf4j
@RestController
@RequestMapping("/github-authentication")
@RequiredArgsConstructor
public class GithubAuthenticationController {
    final private GithubAuthenticationService githubAuthenticationService;
    final private AccountService accountService;
    final private AccountProfileService accountProfileService;
    final private RedisCacheService redisCacheService;

    @GetMapping("/request-login-url")
    public String requestGetLoginLink() {
        log.info("requestGetLoginLink() called");

        return githubAuthenticationService.getLoginLink();
    }

    @GetMapping("/login")
    @Transactional
    public void requestAccessToken(@RequestParam("code") String code, HttpServletResponse response) throws IOException {
        log.info("requestAccessToken(): code {}", code);

        try {
            Map<String, Object> tokenResponse = githubAuthenticationService.requestAccessToken(code);
            String accessToken = (String) tokenResponse.get("access_token");

            Map<String, Object> userInfo = githubAuthenticationService.requestUserInfo(accessToken);
            log.info("userInfo: {}", userInfo);

//            String email = (String) userInfo.get("email");
            //수정사항
            //email이 존재하지않는다면 user/email url get 형태로 재시도
            String email = (String) userInfo.get("email");
            if (email == null || email.isBlank()) {
                email = githubAuthenticationService.requestPrimaryEmail(accessToken);
                if (email == null) throw new IllegalArgumentException("이메일이 없습니다.");
            }
            String nickname = (String) userInfo.get("name");
            log.info("email: {}, nickname: {}", email, nickname);
            /*

            //name이 null또는 공백일경우 name대신 user의 아이디(login)를 db에 저장시도
            String nickname = (String) userInfo.get("name");
            if (nickname == null || nickname.isBlank()) {
                nickname = (String) userInfo.get("login");
                if (nickname == null) nickname = "github_user";
            }
             */

            Optional<AccountProfile> optionalProfile = accountProfileService.loadProfileByEmail(email);
            Account account = null;

            if (optionalProfile.isPresent()) {
                account = optionalProfile.get().getAccount();
                log.info("account (existing): {}", account);
            }

            if (account == null) {
                log.info("New user detected. Creating account and profile...");
                account = accountService.createAccount();
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
            log.error("Github 로그인 에러", e);
            response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "깃허브 로그인 실패: " + e.getMessage());
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
