package com.example.monoproj.laptop.controller.request_form;

import com.example.monoproj.laptop.service.request.ListLaptopRequest;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class ListLaptopRequestForm {
    private final int page;
    private final int perPage;

    public ListLaptopRequest toListLaptopRequest() {
        return new ListLaptopRequest(page, perPage);
    }
}
