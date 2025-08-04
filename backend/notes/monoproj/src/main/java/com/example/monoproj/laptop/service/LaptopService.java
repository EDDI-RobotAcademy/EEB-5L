package com.example.monoproj.laptop.service;

import com.example.monoproj.laptop.service.request.ListLaptopRequest;
import com.example.monoproj.laptop.service.request.RegisterLaptopImageRequest;
import com.example.monoproj.laptop.service.request.RegisterLaptopRequest;
import com.example.monoproj.laptop.service.response.ListLaptopResponse;
import com.example.monoproj.laptop.service.response.RegisterLaptopResponse;

import java.io.IOException;

public interface LaptopService {
    RegisterLaptopResponse registerLaptop(
            RegisterLaptopRequest laptopRequest,
            RegisterLaptopImageRequest laptopImageRequest) throws IOException;

    ListLaptopResponse getAllLaptops(ListLaptopRequest request);
}
