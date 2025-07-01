package com.example.monoproj.sample_board.service;

import com.example.monoproj.sample_board.entity.SampleBoard;
import com.example.monoproj.sample_board.service.request.CreateSampleBoardRequest;

public interface SampleBoardService {
    SampleBoard create(CreateSampleBoardRequest request);
}
