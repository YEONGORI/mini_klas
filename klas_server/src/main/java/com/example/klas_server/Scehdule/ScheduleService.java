package com.example.klas_server.Scehdule;

import com.example.klas_server.Lecture.Lecture.LectureRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ScheduleService {
    private final LectureRepository lectureRepository;

    public String getSchedule() {
        lectureRepository.findAll();
        return null;
    }
}
