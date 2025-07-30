package com.example.monoproj.laptop.entity;

import jakarta.persistence.Embeddable;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Getter;

@Getter
@Embeddable
public class LaptopSpecification {
    @Enumerated(EnumType.STRING)
    private CpuType cpu;

    @Enumerated(EnumType.STRING)
    private RamSize ram;

    @Enumerated(EnumType.STRING)
    private StorageType storage;

    protected LaptopSpecification() {}

    public LaptopSpecification(CpuType cpu, RamSize ram, StorageType storage) {
        this.cpu = cpu;
        this.ram = ram;
        this.storage = storage;
    }
}
