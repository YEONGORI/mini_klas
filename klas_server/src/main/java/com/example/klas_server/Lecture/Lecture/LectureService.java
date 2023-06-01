package com.example.klas_server.Lecture.Lecture;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LectureService {
    @Autowired
    private LectureRepository lectureRepository;

    public LectureDTO saveLecture(LectureDTO lecture){
        return (LectureDTO) lectureRepository.save(lecture);
    }

}
