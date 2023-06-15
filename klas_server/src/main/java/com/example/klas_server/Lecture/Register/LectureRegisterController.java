package com.example.klas_server.Lecture.Register;


import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequiredArgsConstructor
@CrossOrigin
@RequestMapping("/lecture")
public class LectureRegisterController {

    private final LectureRegisterService lectureRegisterService;
    @PostMapping("/register")
    public ResponseEntity<HttpStatus> registerLecture(@RequestBody LectureRegisterDTO data )
    {
        System.out.println(data);
        System.out.println(data.getId());
        System.out.println(data.getLectureDTO().toString());
        System.out.println(data.getUser());
        try {
            Boolean result = lectureRegisterService.register(data);
            if (!result)
                return new ResponseEntity<>(HttpStatus.REQUESTED_RANGE_NOT_SATISFIABLE);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
