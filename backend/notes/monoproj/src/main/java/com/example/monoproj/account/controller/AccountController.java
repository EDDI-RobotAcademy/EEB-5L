package com.example.monoproj.account.controller;

import com.example.monoproj.account.controller.request_form.RegisterNormalAccountRequestForm;
import com.example.monoproj.account.entity.Account;
import com.example.monoproj.account.service.AccountService;
import com.example.monoproj.account_profile.service.AccountProfileService;
import com.example.monoproj.redis_cache.service.RedisCacheService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/account")
public class AccountController {

    private final AccountService accountService;
    private final RedisCacheService redisCacheService;
    private final AccountProfileService accountProfileService;

    @PostMapping("/register")
    @Transactional
    public String register(@RequestBody RegisterNormalAccountRequestForm requestForm) {
        log.info("회원 가입 요청: requestForm={}", requestForm);

        String temporaryUserToken = requestForm.getTemporaryUserToken();
        String accessToken = redisCacheService.getValueByKey(temporaryUserToken, String.class);
        if (accessToken == null) {
            throw new IllegalArgumentException("만료되었거나 잘못된 임시 토큰입니다.");
        }

        Account account = accountService.createAccount(requestForm.toRegisterNormalAccountRequest());
        accountProfileService.createAccountProfile(account, requestForm.toRegisterAccountProfileRequest());

        String userToken = UUID.randomUUID().toString();
        redisCacheService.setKeyAndValue(account.getId(), accessToken);
        redisCacheService.setKeyAndValue(userToken, account.getId());

        redisCacheService.deleteByKey(temporaryUserToken);

        return userToken;
    }
}
