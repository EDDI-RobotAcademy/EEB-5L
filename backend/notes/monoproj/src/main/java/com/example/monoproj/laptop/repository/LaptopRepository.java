package com.example.monoproj.laptop.repository;

import com.example.monoproj.laptop.entity.Laptop;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LaptopRepository extends JpaRepository<Laptop, Long> {
}
