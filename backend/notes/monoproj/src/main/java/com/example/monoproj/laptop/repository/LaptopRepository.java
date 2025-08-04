package com.example.monoproj.laptop.repository;

import com.example.monoproj.laptop.entity.Laptop;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface LaptopRepository extends JpaRepository<Laptop, Long> {

    @Query(
            value = "select l from Laptop l join fetch l.account a",
            countQuery = "select count(l) from Laptop l"
    )
    Page<Laptop> findAllLaptopsWithAccount(Pageable pageable);

}
