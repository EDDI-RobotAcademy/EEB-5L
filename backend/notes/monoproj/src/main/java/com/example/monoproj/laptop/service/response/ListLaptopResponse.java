package com.example.monoproj.laptop.service.response;

import com.example.monoproj.laptop.entity.Laptop;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Getter
@RequiredArgsConstructor
public class ListLaptopResponse {
    private final List<Laptop> laptopList;
    private final int currentPage;
    private final int totalPages;
    private final long totalItems;
    private final Map<Long, String> thumbnailUrlMap;

    public static ListLaptopResponse from(List<Laptop> laptopList, int currentPage, int totalPages, long totalItems, Map<Long, String> thumbnailUrlMap) {
        return new ListLaptopResponse(laptopList, currentPage, totalPages, totalItems, thumbnailUrlMap);
    }

    public List<Map<String, Object>> toMapList() {
        return laptopList.stream()
                .map(laptop -> {
                    Map<String, Object> map = new HashMap<>();
                    map.put("id", laptop.getId());
                    map.put("title", laptop.getTitle());
                    map.put("price", laptop.getPrice());

                    String thumbnailUrl = thumbnailUrlMap.getOrDefault(laptop.getId(), "");
                    map.put("thumbnailImageUrl", thumbnailUrl);

                    return map;
                })
                .collect(Collectors.toList());
    }
}

