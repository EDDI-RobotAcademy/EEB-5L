package com.example.monoproj.sample_board.controller.request_form;

import com.example.monoproj.sample_board.service.request.CreateSampleBoardRequest;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.ToString;

@Getter
@ToString
@RequiredArgsConstructor
public class CreateSampleBoardRequestForm {
    final private String title;
    final private String content;

    public CreateSampleBoardRequest toCreateSampleBoardRequest() {
        return new CreateSampleBoardRequest(title, content);
    }
}
