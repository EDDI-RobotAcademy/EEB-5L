package com.example.monoproj.laptop.controller;

import com.example.monoproj.laptop.controller.request_form.ListLaptopRequestForm;
import com.example.monoproj.laptop.controller.request_form.RegisterLaptopRequestForm;
import com.example.monoproj.laptop.controller.response_form.ListLaptopResponseForm;
import com.example.monoproj.laptop.controller.response_form.RegisterLaptopResponseForm;
import com.example.monoproj.laptop.service.LaptopService;
import com.example.monoproj.laptop.service.request.ListLaptopRequest;
import com.example.monoproj.laptop.service.request.RegisterLaptopImageRequest;
import com.example.monoproj.laptop.service.request.RegisterLaptopRequest;
import com.example.monoproj.laptop.service.response.ListLaptopResponse;
import com.example.monoproj.laptop.service.response.RegisterLaptopResponse;
import com.example.monoproj.redis_cache.service.RedisCacheService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/laptop")
public class LaptopController {

    final private LaptopService laptopService;
    final private RedisCacheService redisCacheService;

    @PostMapping(value = "/register", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public RegisterLaptopResponseForm register(
            @RequestHeader("Authorization") String authorization,
            @ModelAttribute RegisterLaptopRequestForm requestForm) throws IOException {

        String token = extractToken(authorization);
        Long accountId = redisCacheService.getValueByKey(token, Long.class);
        if (accountId == null) {
            throw new RuntimeException("Invalid or expired token");
        }

        log.info("요청 폼 내용 - title: {}, description: {}, price: {}, thumbnailFile: {}, imageFileList size: {}",
                requestForm.getTitle(),
                requestForm.getDescription(),
                requestForm.getPrice(),
                requestForm.getThumbnailFile() != null ? requestForm.getThumbnailFile().getOriginalFilename() : "null",
                requestForm.getImageFileList() != null ? requestForm.getImageFileList().size() : 0);

        if (requestForm.getImageFileList() != null) {
            requestForm.getImageFileList().forEach(file -> {
                log.info("추가 이미지 파일 이름: {}", file.getOriginalFilename());
            });
        }

        RegisterLaptopRequest laptopRequest = requestForm.toRegisterLaptopRequest(accountId);
        RegisterLaptopImageRequest laptopImageRequest = requestForm.toRegisterLaptopImageRequest();
        RegisterLaptopResponse response = laptopService.registerLaptop(laptopRequest, laptopImageRequest);
        RegisterLaptopResponseForm responseForm = RegisterLaptopResponseForm.from(response);

        log.info("responseForm: {}", responseForm);
        return responseForm;
    }

    @GetMapping("/list")
    public ListLaptopResponseForm list(@ModelAttribute ListLaptopRequestForm requestForm) {
        ListLaptopRequest request = requestForm.toListLaptopRequest();
        ListLaptopResponse response = laptopService.getAllLaptops(request);
        return ListLaptopResponseForm.from(response);
    }

    private String extractToken(String authorizationHeader) {
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            return authorizationHeader.substring(7);
        }
        throw new RuntimeException("Invalid Authorization header");
    }
}
