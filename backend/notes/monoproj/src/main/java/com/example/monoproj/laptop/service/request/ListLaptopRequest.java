package com.example.monoproj.laptop.service.request;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class ListLaptopRequest {
    private final int page;
    private final int perPage;
}
