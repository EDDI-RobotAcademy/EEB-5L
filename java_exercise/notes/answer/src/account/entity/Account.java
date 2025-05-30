package account.entity;

public class Account {
    private static long idCounter = 0;

    private final long id;
    private String userId;
    private String password;

    public Account(String userId, String password) {
        this.id = idCounter++;
        this.userId = userId;
        this.password = password;
    }

    public long getId() {
        return id;
    }

    public String getUserId() {
        return userId;
    }

    public String getPassword() {
        return password;
    }

    @Override
    public String toString() {
        return "Account{" +
                "id=" + id +
                ", userId='" + userId + '\'' +
                ", password='" + password + '\'' +
                '}';
    }
}
