package com.example.monoproj.sample_board.controller;

import com.example.monoproj.sample_board.controller.request_form.CreateSampleBoardRequestForm;
import com.example.monoproj.sample_board.entity.SampleBoard;
import com.example.monoproj.sample_board.service.SampleBoardService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/sample-board")
@RequiredArgsConstructor
public class SampleBoardController {

    final private SampleBoardService boardService;

    @PostMapping("/create")
    public SampleBoard createSampleBoard(
            @RequestBody CreateSampleBoardRequestForm requestForm) {

        log.info("createSampleBoard() -> requestForm: {}", requestForm);

        return boardService.create(requestForm.toCreateSampleBoardRequest());
    }
}
