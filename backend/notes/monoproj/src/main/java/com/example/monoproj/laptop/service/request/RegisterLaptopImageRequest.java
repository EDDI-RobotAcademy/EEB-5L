package com.example.monoproj.laptop.service.request;

import com.example.monoproj.laptop.entity.Laptop;
import com.example.monoproj.laptop.entity.LaptopImage;
import com.example.monoproj.laptop.entity.LaptopImageType;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Getter
@RequiredArgsConstructor
public class RegisterLaptopImageRequest {
    final private MultipartFile thumbnailFile;
    final private List<MultipartFile> imageFileList;

    public LaptopImage toLaptopImageThumbnail(String imageUrl, Laptop laptop) throws IOException {
        return new LaptopImage(
                imageUrl,
                LaptopImageType.THUMBNAIL,
                laptop
        );
    }

    public List<LaptopImage> toLaptopImageList(List<String> imageUrlList, Laptop laptop) throws IOException {
        List<LaptopImage> images = new ArrayList<>();

        for (String imageUrl : imageUrlList) {
            images.add(new LaptopImage(
                    imageUrl,
                    LaptopImageType.DETAIL,
                    laptop
            ));
        }

        return images;
    }
}
