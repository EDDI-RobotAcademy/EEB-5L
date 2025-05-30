package account.repository;

import account.entity.Account;

public interface AccountRepository {
    int save(Account account);
}
