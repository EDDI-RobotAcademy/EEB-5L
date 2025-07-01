package com.example.monoproj.account_profile.entity;

import com.example.monoproj.account.entity.Account;
import jakarta.persistence.*;
import lombok.Getter;

@Entity
@Getter
@Table(name = "account_profile")
public class AccountProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nickname", length = 64, unique = true, nullable = false)
    private String nickname;

    @Column(name = "email", length = 32, unique = true, nullable = false)
    private String email;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "account_id", referencedColumnName = "id", nullable = false)
    private Account account;

    public AccountProfile() {
    }

    public AccountProfile(Account account, String nickname, String email) {
        this.account = account;
        this.nickname = nickname;
        this.email = email;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setAccount(Account account) {
        this.account = account;
    }
}

