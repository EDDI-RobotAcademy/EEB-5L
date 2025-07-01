package com.example.monoproj.account_profile.repository;

import com.example.monoproj.account.entity.Account;
import com.example.monoproj.account.entity.LoginType;
import com.example.monoproj.account_profile.entity.AccountProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface AccountProfileRepository extends JpaRepository<AccountProfile, Long> {
    Optional<AccountProfile> findByAccount(Account account);

    @Query("SELECT ap FROM AccountProfile ap JOIN FETCH ap.account WHERE ap.email = :email")
    Optional<AccountProfile> findWithAccountByEmail(@Param("email") String email);

    @Query("SELECT ap FROM AccountProfile ap JOIN FETCH ap.account a WHERE ap.email = :email AND a.loginType.loginType = :loginType")
    Optional<AccountProfile> findWithAccountByEmailAndLoginType(@Param("email") String email, @Param("loginType") LoginType loginType);
}
