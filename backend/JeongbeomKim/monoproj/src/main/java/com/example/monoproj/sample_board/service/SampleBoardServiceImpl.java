package com.example.monoproj.sample_board.service;

import com.example.monoproj.sample_board.entity.SampleBoard;
import com.example.monoproj.sample_board.repository.SampleBoardRepository;
import com.example.monoproj.sample_board.service.request.CreateSampleBoardRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class SampleBoardServiceImpl implements SampleBoardService {

    final private SampleBoardRepository sampleBoardRepository;

    @Override
    public SampleBoard create(CreateSampleBoardRequest request) {
        log.info("SampleBoardServiceImpl create() -> request: {}", request);
        return sampleBoardRepository.save(request.toSampleBoard());
    }
}
