package com.example.monoproj.laptop.service.response;

import com.example.monoproj.laptop.entity.Laptop;
import com.example.monoproj.laptop.entity.LaptopImage;
import com.example.monoproj.laptop.entity.LaptopImageType;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@RequiredArgsConstructor
public class RegisterLaptopResponse {
    private final Long id;
    private final String title;
    private final String description;
    private final Integer price;

    private final String cpuType;
    private final String ramSize;
    private final String storageType;

    private final String thumbnailImageUrl;
    private final List<String> detailImageUrlList;

    public static RegisterLaptopResponse from(Laptop laptop, List<LaptopImage> imageList) {
        String thumbnailImageUrl = imageList.stream()
                .filter(img -> img.getType() == LaptopImageType.THUMBNAIL)
                .map(LaptopImage::getImageUrl)
                .findFirst()
                .orElse(null);

        List<String> detailImageUrlList = imageList.stream()
                .filter(img -> img.getType() == LaptopImageType.DETAIL)
                .map(LaptopImage::getImageUrl)
                .collect(Collectors.toList());

        return new RegisterLaptopResponse(
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
