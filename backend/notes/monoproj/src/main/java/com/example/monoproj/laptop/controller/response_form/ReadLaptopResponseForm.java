package com.example.monoproj.laptop.controller.response_form;

import com.example.monoproj.laptop.service.response.ReadLaptopResponse;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.ToString;

import java.util.List;

@Getter
@ToString
@RequiredArgsConstructor
public class ReadLaptopResponseForm {

    private final Long id;
    private final String title;
    private final String description;
    private final Integer price;

    private final String cpuType;
    private final String ramSize;
    private final String storageType;

    private final String thumbnailImageUrl;
    private final List<String> detailImageUrlList;

    public static ReadLaptopResponseForm from(final ReadLaptopResponse response) {
        return new ReadLaptopResponseForm(
                response.getId(),
                response.getTitle(),
                response.getDescription(),
                response.getPrice(),
                response.getCpuType(),
                response.getRamSize(),
                response.getStorageType(),
                response.getThumbnailImageUrl(),
                response.getDetailImageUrlList()
        );
    }
}
