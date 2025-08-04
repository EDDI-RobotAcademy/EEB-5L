package com.example.monoproj.laptop.controller.response_form;

import com.example.monoproj.laptop.service.response.ListLaptopResponse;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.Map;

@Getter
@RequiredArgsConstructor
public class ListLaptopResponseForm {
    private final List<Map<String, Object>> laptopList;
    private final int currentPage;
    private final int totalPages;
    private final long totalItems;

    public static ListLaptopResponseForm from(ListLaptopResponse response) {
        return new ListLaptopResponseForm(
                response.toMapList(),
                response.getCurrentPage(),
                response.getTotalPages(),
                response.getTotalItems()
        );
    }
}
