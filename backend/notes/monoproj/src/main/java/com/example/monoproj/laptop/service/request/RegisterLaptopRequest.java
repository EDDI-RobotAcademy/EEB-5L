package com.example.monoproj.laptop.service.request;

import com.example.monoproj.account.entity.Account;
import com.example.monoproj.laptop.entity.*;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class RegisterLaptopRequest {
    private final String title;
    private final String description;
    private final int price;

    private final CpuType cpuType;
    private final RamSize ramSize;
    private final StorageType storageType;

    private final Long accountId;

    public Laptop toLaptop(Account account) {
        LaptopSpecification spec = new LaptopSpecification(cpuType, ramSize, storageType);
        return new Laptop(title, description, price, account, spec);
    }
}
