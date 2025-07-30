package com.example.monoproj.laptop.repository;

import com.example.monoproj.laptop.entity.LaptopImage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LaptopImageRepository extends JpaRepository<LaptopImage, Long> {
}
