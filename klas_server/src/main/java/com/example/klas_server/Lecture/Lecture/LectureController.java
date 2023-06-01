package com.example.klas_server.Lecture.Lecture;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/lecture")
public class LectureController {

    private LectureService lectureService;

}
