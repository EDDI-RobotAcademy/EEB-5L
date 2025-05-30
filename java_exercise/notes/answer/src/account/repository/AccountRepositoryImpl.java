package account.repository;

import account.entity.Account;

import java.util.HashMap;
import java.util.Map;

public class AccountRepositoryImpl implements AccountRepository {

    private static AccountRepositoryImpl instance;

    private AccountRepositoryImpl() {}

    public static AccountRepositoryImpl getInstance() {
        if (instance == null) {
            instance = new AccountRepositoryImpl();
        }

        return instance;
    }

    private static final Map<Integer, Account> accountHashMap = new HashMap<>();

    @Override
    public int save(Account account) {
        System.out.println("계정 정보를 저장 하는거야? " + account);
        int accountUniqueId = (int) account.getId();
        accountHashMap.put(accountUniqueId, account);

        return accountUniqueId;
    }
}
