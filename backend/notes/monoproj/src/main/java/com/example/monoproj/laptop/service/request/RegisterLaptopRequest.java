package com.example.monoproj.laptop.service.request;

import com.example.monoproj.account.entity.Account;
import com.example.monoproj.laptop.entity.Laptop;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class RegisterLaptopRequest {
    private final String title;
    private final String description;
    private final int price;

    private final Long accountId;

    public Laptop toLaptop(Account account) {
        return new Laptop(title, description, price, account);
    }
}
