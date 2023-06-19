package com.example.klas_server.Lecture.Notice;


import com.example.klas_server.Lecture.Material.LectureMaterialDTO;
import com.example.klas_server.Lecture.Material.LectureMaterialService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/lecture/notice")
@CrossOrigin

public class LectureNoticeController {

    private final LectureNoticeService lectureNoticeService;

    @PostMapping("/delete")
    public ResponseEntity deleteLectureNotice(@RequestBody LectureNoticeDTO data )
    {
        try {

            lectureNoticeService.deleteLectureNotice(data);
            return new ResponseEntity(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }



    @PostMapping("/write")
    public ResponseEntity<LectureNoticeDTO>saveLectureNotice(@RequestBody LectureNoticeDTO data )
    {
        try {




            LectureNoticeDTO result = lectureNoticeService.saveLectureNotice(data);
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }


    @PostMapping("/list")
    public ResponseEntity<List<LectureNoticeDTO>> getLectureNoticesByParameter(@RequestBody LectureNoticeDTO data )
    {

        try {
            List<LectureNoticeDTO> result = lectureNoticeService.printLectureNoticesByParameter(data);
            if (result.isEmpty())
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
