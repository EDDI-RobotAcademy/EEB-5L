package com.example.monoproj.laptop.service.response;

import com.example.monoproj.laptop.entity.Laptop;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Getter
@RequiredArgsConstructor
public class ReadLaptopResponse {

    private final Long id;
    private final String title;
    private final String description;
    private final Integer price;

    private final String cpuType;
    private final String ramSize;
    private final String storageType;

    private final String thumbnailImageUrl;
    private final List<String> detailImageUrlList;

    public static ReadLaptopResponse from(Laptop laptop, String thumbnailImageUrl, List<String> detailImageUrlList) {
        return new ReadLaptopResponse(
                laptop.getId(),
                laptop.getTitle(),
                laptop.getDescription(),
                laptop.getPrice(),
                laptop.getSpecification().getCpu().name(),
                laptop.getSpecification().getRam().name(),
                laptop.getSpecification().getStorage().name(),
                thumbnailImageUrl,
                detailImageUrlList
        );
    }
}
