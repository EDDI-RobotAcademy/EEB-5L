package com.example.monoproj.laptop.service;

import java.io.IOException;

public interface LaptopService {
    RegisterLaptopResponse registerLaptop(
            RegisterLaptopRequest laptopRequest,
            RegisterLaptopImageRequest laptopImageRequest) throws IOException;
}
