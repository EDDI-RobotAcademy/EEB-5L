package com.example.monoproj.laptop.controller.request_form;

import com.example.monoproj.laptop.entity.CpuType;
import com.example.monoproj.laptop.entity.RamSize;
import com.example.monoproj.laptop.entity.StorageType;
import com.example.monoproj.laptop.service.request.RegisterLaptopImageRequest;
import com.example.monoproj.laptop.service.request.RegisterLaptopRequest;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Getter
@RequiredArgsConstructor
public class RegisterLaptopRequestForm {
    final private String title;
    final private String description;
    final private int price;

    final private CpuType cpuType;
    final private RamSize ramSize;
    final private StorageType storageType;

    final private MultipartFile thumbnailFile;
    final private List<MultipartFile> imageFileList;

    public RegisterLaptopRequest toRegisterLaptopRequest(Long accountId) {
        return new RegisterLaptopRequest(title, description, price, cpuType, ramSize, storageType, accountId);
    }

    public RegisterLaptopImageRequest toRegisterLaptopImageRequest() {
        return new RegisterLaptopImageRequest(thumbnailFile, imageFileList);
    }
}
