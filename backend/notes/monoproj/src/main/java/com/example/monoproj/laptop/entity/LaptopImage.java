package com.example.monoproj.laptop.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
public class LaptopImage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String imageUrl;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private LaptopImageType type; // THUMBNAIL or DETAIL

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "laptop_id", nullable = false)
    private Laptop laptop;

    public LaptopImage(String imageUrl, LaptopImageType type, Laptop laptop) {
        this.imageUrl = imageUrl;
        this.type = type;
        this.laptop = laptop;
    }
}
