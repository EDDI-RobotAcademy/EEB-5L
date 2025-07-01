package com.example.monoproj.account.entity;

import jakarta.persistence.*;
import lombok.Getter;

@Entity
@Getter
@Table(name = "account")
public class Account {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "role_type_id", nullable = false)
    private AccountRoleType roleType;

    @ManyToOne
    @JoinColumn(name = "login_type_id", nullable = false)
    private AccountLoginType loginType;

    public Account() {
    }

    public Account(AccountRoleType roleType, AccountLoginType loginType) {
        this.roleType = roleType;
        this.loginType = loginType;
    }

    public void setRoleType(AccountRoleType roleType) {
        this.roleType = roleType;
    }

    public void setLoginType(AccountLoginType loginType) {
        this.loginType = loginType;
    }
}
