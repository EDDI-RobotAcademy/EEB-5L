import account.service.AccountService;
import account.service.AccountServiceImpl;

public class Main {
    public static void main(String[] args) {
        AccountService accountService = AccountServiceImpl.getInstance();
        accountService.register();
    }
}