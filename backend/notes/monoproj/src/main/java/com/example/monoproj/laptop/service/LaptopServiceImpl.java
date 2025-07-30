package com.example.monoproj.laptop.service;

import com.example.monoproj.account.repository.AccountRepository;
import com.example.monoproj.laptop.service.request.RegisterLaptopImageRequest;
import com.example.monoproj.laptop.service.request.RegisterLaptopRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
@RequiredArgsConstructor
public class LaptopServiceImpl implements LaptopService {

    private final LaptopImageRepository laptopImageRepository;
    private final LaptopRepository laptopRepository;
    private final AccountRepository accountRepository;
    private final S3Uploader s3Uploader;

    @Override
    public RegisterLaptopResponse registerLaptop(
            RegisterLaptopRequest laptopRequest,
            RegisterLaptopImageRequest laptopImageRequest) throws IOException {

        return null;
    }
}
