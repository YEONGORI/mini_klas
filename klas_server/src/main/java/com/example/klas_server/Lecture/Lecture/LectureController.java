package com.example.klas_server.Lecture.Lecture;

import com.example.klas_server.Lecture.Plan.LecturePlanDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/lecture")
@CrossOrigin
public class LectureController {



    private final LectureService lectureService;

    @GetMapping("/list")
    public ResponseEntity<List<LectureDTO>> getLectures()
    {

        try {

            List<LectureDTO> result = lectureService.printLectureList();
            if (result.isEmpty())
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/list")
    public ResponseEntity<List<LectureDTO>> getLecturesByParameter(@RequestBody LectureDTO data )
    {

        try {
            List<LectureDTO> result = lectureService.printLectureListByParameter(data);
            if (result.isEmpty())
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


}
