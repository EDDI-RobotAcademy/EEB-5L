package com.example.monoproj.sample_board.controller;

import com.example.monoproj.redis_cache.service.RedisCacheService;
import com.example.monoproj.sample_board.controller.request_form.CreateSampleBoardRequestForm;
import com.example.monoproj.sample_board.controller.request_form.ListSampleBoardRequestForm;
import com.example.monoproj.sample_board.controller.request_form.UpdateSampleBoardRequestForm;
import com.example.monoproj.sample_board.controller.response_form.CreateSampleBoardResponseForm;
import com.example.monoproj.sample_board.controller.response_form.ListSampleBoardResponseForm;
import com.example.monoproj.sample_board.controller.response_form.ReadSampleBoardResponseForm;
import com.example.monoproj.sample_board.controller.response_form.UpdateSampleBoardResponseForm;
import com.example.monoproj.sample_board.service.SampleBoardService;
import com.example.monoproj.sample_board.service.response.CreateSampleBoardResponse;
import com.example.monoproj.sample_board.service.response.ListSampleBoardResponse;
import com.example.monoproj.sample_board.service.response.ReadSampleBoardResponse;
import com.example.monoproj.sample_board.service.response.UpdateSampleBoardResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/sample_board")
public class SampleBoardController {
    final private SampleBoardService sampleBoardService;
    final private RedisCacheService redisCacheService;

    @GetMapping("/list")
    public ListSampleBoardResponseForm sampleBoardList(@ModelAttribute ListSampleBoardRequestForm requestForm){
        log.info("sampleBoardList() -> {}", requestForm);

        ListSampleBoardResponse response = sampleBoardService.listSampleBoard(requestForm.toListSampleBoardRequest());

        return ListSampleBoardResponseForm.from(
                List.of(),
                (int) response.getTotalItems(),
                response.getTotalPages()
        );
    }

    @PostMapping("/register")
    public CreateSampleBoardResponseForm registerBoard(
            @RequestHeader("Authorization") String authorizationHeader,
            @RequestBody CreateSampleBoardRequestForm createSampleBoardRequestForm){
        log.info("registerBoard() {}", createSampleBoardRequestForm);
        log.info("authorizationHeader = {}", authorizationHeader);

        String token = authorizationHeader.replace("Bearer ", "");

        Long accountId = redisCacheService.getValueByKey(token);
        log.info("accountId = {}", accountId);

        CreateSampleBoardResponse response = sampleBoardService.registerSampleBoard(createSampleBoardRequestForm.toCreateSampleBoardRequest(accountId));
        return CreateSampleBoardResponseForm.from(response);
    }

    @GetMapping("/read/{sample_board_id}")
    public ReadSampleBoardResponseForm readBoard(@PathVariable("sample_board_id") Long sample_board_id){
        log.info("boardRead() {}", sample_board_id);
        ReadSampleBoardResponse response = sampleBoardService.readSampleBoard(sample_board_id);
        return new ReadSampleBoardResponseForm(
                response.getBoardId(),
                response.getTitle(),
                response.getNickname(),
                response.getContent(),
                response.getCreateDate()
        );
    }

    @PutMapping("/update/{sample_board_id}")
    public UpdateSampleBoardResponseForm updateBoard(
            @PathVariable("sample_board_id") Long sample_board_id,
            @RequestBody UpdateSampleBoardRequestForm updateSampleBoardRequestForm,
            @RequestHeader("Authorization") String authorizationHeader){

        log.info("modifyBoard(): {}, sample_board_id: {}", updateSampleBoardRequestForm, sample_board_id);

        String token = authorizationHeader.replace("Bearer ", "");
        Long accountId = redisCacheService.getValueByKey(token);
        log.info("accountId = {}", accountId);

        UpdateSampleBoardResponse response = sampleBoardService.updateSampleBoard(
                sample_board_id,
                accountId,
                updateSampleBoardRequestForm.toUpdateSampleBoardRequest()
        );

        return UpdateSampleBoardResponseForm.from(response);
    }
}
