package com.example.monoproj.account.entity;

import jakarta.persistence.*;
import lombok.Getter;

@Entity
@Getter
@Table(name = "account_login_type")
public class AccountLoginType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "login_type", nullable = false, unique = true)
    private LoginType loginType;

    public AccountLoginType() {
    }

    public AccountLoginType(LoginType loginType) {
        this.loginType = loginType;
    }

    public void setLoginType(LoginType loginType) {
        this.loginType = loginType;
    }

    @Override
    public String toString() {
        return loginType.name();
    }
}
