package account.service;

import account.entity.Account;
import account.repository.AccountRepository;
import account.repository.AccountRepositoryImpl;
import utility.KeyboardInput;

public class AccountServiceImpl implements AccountService {

    private static AccountServiceImpl instance;

    private final AccountRepository accountRepository;

    private AccountServiceImpl() {
        this.accountRepository = AccountRepositoryImpl.getInstance();
    }

    public static AccountServiceImpl getInstance() {
        if (instance == null) {
            instance = new AccountServiceImpl();
        }

        return instance;
    }

    @Override
    public int register() {
        System.out.println("회원 가입을 진행합니다!");
        String userId = KeyboardInput.getStringInput("아이디를 입력하세요: ");
        String password = KeyboardInput.getStringInput("비밀번호를 입력하세요: ");

        Account account = new Account(userId, password);
        return accountRepository.save(account);
    }
}
