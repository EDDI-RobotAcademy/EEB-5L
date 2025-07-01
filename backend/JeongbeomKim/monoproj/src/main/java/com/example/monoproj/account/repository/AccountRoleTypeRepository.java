package com.example.monoproj.account.repository;

import com.example.monoproj.account.entity.AccountRoleType;
import com.example.monoproj.account.entity.RoleType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AccountRoleTypeRepository extends JpaRepository<AccountRoleType, Long> {
    Optional<AccountRoleType> findByRoleType(RoleType roleType);
}
