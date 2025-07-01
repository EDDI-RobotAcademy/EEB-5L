package com.example.monoproj.account.service;

import com.example.monoproj.account.entity.Account;
import com.example.monoproj.account.entity.LoginType;

public interface AccountService {
    Account createAccount(LoginType loginType);
}
